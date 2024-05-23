import { Component, Host, h, State, Prop } from '@stencil/core';

@Component({
  tag: 'fpjp-department',
  styleUrl: 'fpjp-department.css',
  shadow: true,
})
export class FpjpDepartment {
  @Prop() depId: string;
  @Prop() basePath: string;
  
  @State() info: DepartmentInfo;
  @State() editor: Boolean = false;
  @State() selectedEquipment: ExtendedEquipment;
  @State() rooms: {"id": string, "name": string}[] = [];

  private async getDepartmentInfo(): Promise<any> {
    // TODO fix:
    // - resets id when refreshed
    // - maybe query the name/path which is in the url
    // console.log(`http://localhost:8000/department/${this.depId}`)
    // return fetch(`http://localhost:8000/department/${this.depId}`)
    // .then((r) => { return r.json() })
    // .catch(()=> { 
    //   console.log('error')
    //   return dep;
    // })
    return await Promise.resolve(dep)
  }

  private setEditor(room: Room, equipment: Equipment) {
    this.editor = !this.editor
    this.selectedEquipment = { 
      "id": equipment !== null ? equipment.id : "", 
      "name": equipment !== null ? equipment.name : "", 
      "type": equipment !== null ? equipment.type : "", 
      "count": equipment !== null ? equipment.count : 0, 
      "room": { "id": room !== null ? room.id : "", "name": room !== null ? room.name : "" } 
    }
  }

  private parseRooms(dep: DepartmentInfo) {
    this.rooms = dep.rooms.map(room => { return { "name": room.name, "id": room.id } })
  }

  async componentWillLoad() {
    this.info = await this.getDepartmentInfo();
    this.parseRooms(this.info)
  }

  render() {
    return (
      <Host>
        { this.editor ? (
          <div class="editor-container">
            <fpjp-equipment-editor 
              rooms={this.rooms}
              equipment={this.selectedEquipment}
            >
            </fpjp-equipment-editor>
          </div>
        ) : (
          <div>
            <h1>{this.info.name + ' - vybavenie'}</h1>
            <div class="container">
            { this.info.rooms.map(room => (
              <div>
                <h3>{room.name}</h3>
                  <md-list>
                  { room.equipment.map((eq: Equipment) => (
                    <md-list-item onClick={() => this.setEditor(room, eq)}>
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
                  onClick={() => console.log('pridavam request')}>
                    <md-icon class="icon" slot="icon">add</md-icon>
                  Nová požiadavka
                </md-filled-tonal-button>
                <md-filled-tonal-button class="add-button"
                  onClick={() => this.setEditor(null, null)}>
                    <md-icon class="icon" slot="icon">add</md-icon>
                  Pridať vybavenie
                </md-filled-tonal-button>
              </div>
            </div>
          </div>
        )}
      </Host>
    );
  }
}

type ExtendedEquipment = {
  id: string,
  room: { id: string, name: string },
  // room_id: string,
  // room_name: string
  type: string,
  count: number,
  name: string,
}

type Equipment = {
  id: string,
  room_id: string,
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

const dep = {
  name: 'Pediatrické oddelenie',
  id: '759413c5-840e-42c3-9e1e-abaa5d4c997f',
  rooms: [
    {
      name: 'Miestnosť 1',
      id: '11',
      equipment: [
        {
          id: '1',
          room_id: '11',
          type: 'medical_equipment',
          name: 'striekačka',
          count: 10
        },
        {
          id: '2',
          room_id: '11',
          type: 'medical_equipment',
          name: 'rukavice',
          count: 20
        },
        {
          id: '3',
          room_id: '11',
          type: 'furniture',
          name: 'kancelársky stôl',
          count: 1
        },
        {
          id: '4',
          room_id: '11',
          type: 'furniture',
          name: 'stolička',
          count: 2
        },
      ]
    },
    {
      id: '22',
      name: 'Miestnosť 2',
      equipment: [
        {
          id: '5',
          room_id: '22',
          type: 'furniture',
          name: 'posteľ',
          count: 4
        },
        {
          id: '6',
          room_id: '22',
          type: 'furniture',
          name: 'stolička',
          count: 4
        },
      ]
    },
    {
      id: '33',
      name: 'Miestnosť 3',
      equipment: [
        {
          id: '6',
          room_id: '33',
          type: 'furniture',
          name: 'posteľ',
          count: 10
        },
      ]
    }
  ]
}