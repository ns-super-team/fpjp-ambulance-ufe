import { Component, Host, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'fpjp-equipment-editor',
  styleUrl: 'fpjp-equipment-editor.css',
  shadow: true,
})
export class FpjpEquipmentEditor {
  @Prop() rooms:  {"id": string, "name": string}[] = []
  @Prop() equipment = {"id": "", "name": "", "type": "", "count": 0, "room": { "id": "", "name": "" }  };

  @State() updatedEquipment = null;
  @State() action = "update";
  @State() valid: boolean;
  
  private equipment_type = ["furniture", "medical_equipment"]
  private formElement: HTMLFormElement;

  private handleInput(ev: InputEvent, field: string) {
    const target = ev.target as HTMLInputElement;
    this.updatedEquipment[field] = target.value
  }

  private async handleUpdate() {
    this.checkForm()

    if (this.valid) {
      console.log(this.updatedEquipment)
    } else {
      console.log("Invalid form")
    }
  }

  private async handleCreate() {
    this.checkForm()

    if (this.valid) {
      console.log(this.updatedEquipment)
    } else {
      console.log("Invalid form")
    }
  }

  private checkForm() {
    const mdInputElements = this.formElement.querySelectorAll('md-outlined-select, md-outlined-text-field');
    // console.log(mdInputElements)
    this.valid = true
    mdInputElements.forEach(element => {
      if ("reportValidity" in element) {
        const valid = (element as HTMLInputElement).reportValidity();
        this.valid &&= valid;
        // console.log(this.valid, valid)
      }
    });
  }

  async componentWillLoad() {
    this.updatedEquipment = {
      id: this.equipment.id,
      room_id: this.equipment.room.id,
      type: this.equipment.type,
      name: this.equipment.name,
      count: this.equipment.count
    }
    
    if (this.equipment.id === "") {
      this.action = "create";
      delete this.updatedEquipment.id
    }
  }

  render() {
    // console.log(this.equipment)
    // console.log(this.rooms)
    return (
      <Host>
        <div class="form-container">
          <h2>{this.equipment.id === "" ? "Pridať nové vybavenie" : "Editácia vybavenia"}</h2>
          <form ref={el => this.formElement = el} class="equipment-form">
            <div class="input-container">
              Typ vybavenia *
              <md-outlined-select required class="selector"
                onChange={(ev: InputEvent) => {
                  this.handleInput(ev, "type")
                }}
              >
                { this.equipment_type.map (type =>
                  <md-select-option value={type} selected={this.equipment.type === type ? true : false}>
                    <div slot="headline">{type === 'medical_equipment' ? 'Medicínske vybavenie' : 'Nábytok'}</div>
                  </md-select-option>
                )}
              </md-outlined-select>
            </div>
            <div class="horizontal-inputs">
              <div class="input-container-name">
                Názov vybavenia *
                <md-outlined-text-field required class="text-field" value={this.equipment.name}
                  oninput={ (ev: InputEvent) => {
                    this.handleInput(ev, "name")
                  }}
                >

                </md-outlined-text-field>
              </div>
              <div class="input-container-quantity">
                Počet
                <md-outlined-text-field 
                  required
                  type="number" 
                  pattern="^[0-9]*$" 
                  min="0" 
                  class="text-field"
                  value={this.equipment.count}
                  onKeyPress={(event: any) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  oninput={ (ev: InputEvent) => {
                    this.handleInput(ev, "count")
                  }}
                >
                  {/* <md-icon slot="leading-icon">fingerprint</md-icon> */}
                </md-outlined-text-field>
              </div>
            </div>
            <div class="input-container">
              Miestnosť *
              <md-outlined-select required class="selector"
                onChange={(ev: InputEvent) => {
                  this.handleInput(ev, "room_id")
                }}
              >
                { this.rooms.map(room =>
                  <md-select-option value={room.id} selected={this.equipment.room.name === room.name ? true : false}>
                    <div slot="headline">{room.name}</div>
                  </md-select-option>
                )}
              </md-outlined-select>
            </div>
          </form>
          <div class="button-container">
            <md-filled-tonal-button id="back" class="back-button"
              onClick={() => console.log()}>
                <md-icon class="icon" slot="icon">arrow_back</md-icon>
              Späť
            </md-filled-tonal-button>
            <md-filled-tonal-button id="save" class="save-button"
              onClick={() => this.action === "update" ? this.handleUpdate() : this.handleCreate()}>
                <md-icon class="icon" slot="icon">save</md-icon>
              Uložiť
            </md-filled-tonal-button>
          </div>
        </div>
      </Host>
    );
  }
}
