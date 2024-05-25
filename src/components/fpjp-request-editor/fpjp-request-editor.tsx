import { Component, Host, h, Prop, State, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'fpjp-request-editor',
  styleUrl: 'fpjp-request-editor.css',
  shadow: true,
})
export class FpjpRequestEditor {
  @Prop() rooms:  {"id": string, "name": string}[] = []
  @Prop() request = {"id": "", "name": "", "type": "", "count": 0, "room": { "id": "", "name": "" }, "description": "" };
  @Prop() apiBase: string;

  @Event({ eventName: "clicked"}) Clicked: EventEmitter<any>;

  @State() updatedRequest = null;
  @State() action = "update";
  @State() valid: boolean;
  @State() dialog = false;
  @State() error = "";
  @State() brokenEquipment = false;

  private request_type = ["missing", "repair"]
  private formElement: HTMLFormElement;

  private async apiRequest(path: string, body: any, method: string) {
    return await fetch(path, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
    .then((response) => {
      if (response.ok) {
        if (response.status !== 204) return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .catch((response) => {
      response.json().then((msg: any) => console.log("Error: ", msg))
      this.error = `The server responded with ${response.status} (${response.statusText})`
    })
  }

  private async handleCreate() {
    this.checkForm()
    console.log("Create")
    
    // if (this.valid) {
    //   const requestPath = `${this.apiBase}/rooms/${this.updatedEquipment.room_id}/equipment`
    //   const response = await this.apiRequest(requestPath, this.updatedEquipment, "POST")
      
    //   if (this.error === "") {
    //     console.log(response)
    //     this.Clicked.emit(this.action)
    //   }
    // } else {
    //   console.log("Invalid form")
    // }
  }

  private async handleUpdate() {
    this.checkForm()
    console.log("Update")

    // if (this.valid) {
    //   const requestPath = `${this.apiBase}/equipment/${this.updatedEquipment.id}`
    //   const response = await this.apiRequest(requestPath, this.updatedEquipment, "PUT")

    //   if (this.error === "") {
    //     console.log(response)
    //     this.Clicked.emit(this.action)
    //   }
    // } else {
    //   console.log("Invalid form")
    // }
  }
  
  private async handleDelete() {
    console.log("Delete")
    // const requestPath = `${this.apiBase}/equipment/${this.updatedEquipment.id}`
    // const response = await this.apiRequest(requestPath, null, "DELETE")

    // if (this.error === "") {
    //   console.log(response)
    //   this.Clicked.emit(this.action)
    // }

    // this.dialog = false
  }

  private handleInput(ev: InputEvent, field: string) {
    const target = ev.target as HTMLInputElement;
    if (field === "count") {
      this.updatedRequest[field] = Number(target.value)
    } else {
      this.updatedRequest[field] = target.value
    }
  }


  private checkForm() {
    const mdInputElements = this.formElement.querySelectorAll('md-outlined-select, md-outlined-text-field');
    this.valid = true
    mdInputElements.forEach(element => {
      if ("reportValidity" in element) {
        const valid = (element as HTMLInputElement).reportValidity();
        this.valid &&= valid;
      }
    });
  }

  async componentWillLoad() {
    this.updatedRequest = {
      id: this.request.id,
      room_id: this.request.room.id,
      type: this.request.type,
      name: this.request.name,
      count: this.request.count || null,
      description: this.request.description,
    }

    this.brokenEquipment = this.request.type === "repair";
    
    if (this.request.id === "") {
      this.action = "create";
      delete this.updatedRequest.id
    }
  }

  render() {
    console.log(this.request)
    return (
      <Host>
        <div class="form-container">
        <h2>{this.action === "create" ? "Pridať novú požiadavku" : "Editácia požiadavky"}</h2>
        <form ref={el => this.formElement = el} class="equipment-form">
          <div class="input-container">
            Typ požiadavky *
            <md-outlined-select required class="selector"
              disabled={this.action === "update"}
              onChange={(ev: InputEvent) => {
                this.handleInput(ev, "type");
                this.brokenEquipment = (ev.target as HTMLSelectElement).value === "repair" ? true : false;
              }}
            >
              { this.request_type.map (type =>
                <md-select-option value={type} selected={this.request.type === type ? true : false}>
                  <div slot="headline">{type === 'missing' ? 'Chýbajúce vybavenie' : 'Pokazené vybavenie'}</div>
                </md-select-option>
              )}
            </md-outlined-select>
          </div>
            <div class="horizontal-inputs">
              <div class="input-container-name">
                Názov požiadavky *
                <md-outlined-text-field required class="text-field" value={this.request.name}
                  oninput={ (ev: InputEvent) => {
                    this.handleInput(ev, "name")
                  }}
                >
                </md-outlined-text-field>
              </div>
              { !this.brokenEquipment && (
                <div class="input-container-quantity">
                  Počet
                  <md-outlined-text-field required type="number" 
                    pattern="^[0-9]*$" 
                    min="0" 
                    class="text-field"
                    value={this.request.count}
                    onKeyPress={(event: any) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    oninput={ (ev: InputEvent) => {
                      this.handleInput(ev, "count")
                    }}
                  >
                  </md-outlined-text-field>
                </div>
              )}
            </div>
            <div class="input-container">
              Miestnosť *
              <md-outlined-select required class="selector"
                disabled={this.action === "update"}
                onChange={(ev: InputEvent) => {
                  this.handleInput(ev, "room_id")
                }}
              >
                { this.rooms.map(room =>
                  <md-select-option value={room.id} selected={this.request.room.name === room.name ? true : false}>
                    <div slot="headline">{room.name}</div>
                  </md-select-option>
                )}
              </md-outlined-select>
            </div>
            
            { this.brokenEquipment && (
              <div class="input-container">
                Opis problému *
                <md-outlined-text-field required 
                  class="text-field" 
                  type="textarea"
                  rows="3"
                  value={this.request.description}
                  oninput={ (ev: InputEvent) => {
                    this.handleInput(ev, "description")
                  }}
                >
                </md-outlined-text-field>
              </div>
            )}
          </form>
          <md-dialog class="dialog" type="confirm" open={this.dialog}>
            <div slot="headline">Potvrďte vymazanie</div>
            <form id="form" slot="content" method="dialog">
              Naozaj chcete vymazať toto vybavenie?
            </form>
            <div slot="actions">
              <md-text-button class="dialog-delete-button" form="form" value="delete"
                onClick={() => {
                  this.handleDelete()
                }}
              >
                Vymazať
              </md-text-button>
              <md-filled-tonal-button class="dialog-cancel-button" form="form" value="cancel" autofocus
                onClick={() => {
                  this.dialog = false
                }}
              >
                Zrušiť
              </md-filled-tonal-button>
            </div>
          </md-dialog>
          <div class="button-container">
            <md-filled-tonal-button id="back" class="back-button"
              onClick={() => this.Clicked.emit("cancel")}
            >
              <md-icon class="icon" slot="icon">arrow_back</md-icon>
              Späť
            </md-filled-tonal-button>
            <div class="cd-button-container">
              { this.action === "update" && (
                <md-filled-tonal-button id="deleted" class="delete-button"
                  onClick={() => this.dialog = true}
                >
                  <md-icon class="icon" slot="icon">delete</md-icon>
                  Vymazať
                </md-filled-tonal-button>
              )}
              <md-filled-tonal-button id="save" class="save-button"
                onClick={() => this.action === "update" ? this.handleUpdate() : this.handleCreate()}
              >
                <md-icon class="icon" slot="icon">save</md-icon>
                Uložiť
              </md-filled-tonal-button>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
