import { Component, Host, h, State, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'fpjp-department',
  styleUrl: 'fpjp-department.css',
  shadow: true,
})
export class FpjpDepartment {
  @Prop() depId: string;
  @Prop() basePath: string;
  @Prop() apiBase: string;
  
  @Event({ eventName: "clicked"}) Clicked: EventEmitter<any>;

  @State() info: DepartmentInfo;
  @State() rooms: {"id": string, "name": string}[] = [];
  @State() loading = true;
  @State() error = false;

  // load initial data
  private async getDepartmentInfo(): Promise<any> {
    return fetch(`${this.apiBase}/departments/${this.depId}/equipment`)
    .then((response) => {
      if (response.ok) {
        this.loading = false;
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .catch((response) => {
      try {
        this.loading = false
        this.error = true
        response.json().then((msg: any) => console.log("Error: ", msg))
      } catch (err) {
        console.log(err)
      }
    })
  }

  // open editor for equipment or request
  private setEditor(room: Room, equipment: Equipment, editor: string) {
    if (editor === "equipment") {
      const selectedEquipment = { 
        "id": equipment !== null ? equipment.id : "", 
        "name": equipment !== null ? equipment.name : "", 
        "type": equipment !== null ? equipment.type : "", 
        "count": equipment !== null ? equipment.count : 0, 
        "room": { "id": room !== null ? room.id : "", "name": room !== null ? room.name : "" } 
      }
      this.Clicked.emit({ path: equipment !== null ? equipment.id : "new" , eq: selectedEquipment, rooms: this.rooms })
    } else if (editor === "request") {
      const selectedRequest = { 
        "id": "", 
        "name": "", 
        "type": "missing", 
        "count": 0, 
        "room": { "id": "", "name": "" } 
      }
      this.Clicked.emit({ path: "new", req: selectedRequest, rooms: this.rooms })
    }
  }

  private parseRooms(dep: DepartmentInfo) {
    this.rooms = dep.rooms.map(room => { return { "name": room.name, "id": room.id } })
  }

  async componentWillLoad() {
    this.info = await this.getDepartmentInfo();
    // console.log(this.info)
    this.parseRooms(this.info)
  }

  render() {
    if (this.loading) {
      return (
        <div class="progress-indicator">
          <md-circular-progress indeterminate></md-circular-progress>
        </div>
      )
    } else if (this.error) {
      return (
        <div>
          <h1 class="error-msg">Something went wrong 😑</h1>
          <h3 class="error-msg">Can't connect to the api</h3>
        </div>
      )
    }

    return (
      <Host>
        <h1>{this.info.name + ' - vybavenie'}</h1>
        <div class="container">
        { this.info.rooms.map(room => (
          <div>
            <h3>{room.name}</h3>
            <md-list>
            { room.equipment.map((eq: Equipment) => (
              <md-list-item onClick={() => this.setEditor(room, eq, "equipment")}>
                <div slot="headline">{eq.name}</div>
                <div slot="supporting-text">{eq.type === 'medical_equipment' ? 'medicínske vybavenie' : 'nábytok'}</div>
                { eq.type === "medical_equipment" ?
                    <md-icon slot="start">vaccines</md-icon>
                    :
                    <md-icon slot="start">chair</md-icon>
                  }
                <div slot="trailing-supporting-text">{"počet: " + eq.count}</div>
              </md-list-item>
            ))}
            </md-list>
            { room.equipment.length == 0 && (
              <p>Miestnosť neobsahuje žiadne vybavenie</p>
            )}
          </div>
        ))} 
        </div>
        <div class="button-container">
          <md-filled-tonal-button class="back-button"
            onClick={() => window.navigation.navigate(new URL(this.basePath, document.baseURI))}>
              <md-icon class="icon" slot="icon">arrow_back</md-icon>
            Späť
          </md-filled-tonal-button>
          <div class="add-button-container">
            <md-filled-tonal-button class="add-request-button"
              onClick={() => this.setEditor(null, null, "request")}
            >
              <md-icon class="icon" slot="icon">add</md-icon>
              Nová požiadavka
            </md-filled-tonal-button>
            <md-filled-tonal-button class="add-button"
              onClick={() => this.setEditor(null, null, "equipment")}
            >
              <md-icon class="icon" slot="icon">add</md-icon>
              Pridať vybavenie
            </md-filled-tonal-button>
          </div>
        </div>
      </Host>
    );
  }
}

type Equipment = {
  id: string,
  room: string,
  type: string,
  count: number,
  name: string,
}

type Room = {
  name: string,
  id: string,
  equipment: Equipment[]
}

type DepartmentInfo = {
  name: string,
  id: string,
  rooms: Room[]
}
