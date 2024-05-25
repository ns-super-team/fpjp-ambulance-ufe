import { Component, Host, h, Prop, State, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'fpjp-department-requests',
  styleUrl: 'fpjp-department-requests.css',
  shadow: true,
})
export class FpjpDepartmentRequests {
  @Prop() depId: string;
  @Prop() basePath: string;
  @Prop() apiBase: string;

  @Event({ eventName: "clicked"}) Clicked: EventEmitter<any>;
  
  @State() info: DepartmentInfo;
  @State() rooms: {"id": string, "name": string}[] = [];
  @State() loading = true;
  @State() error = false;
  @State() selectedRequest: any;
  
  private async getDepartmentInfo(): Promise<any> {
    return fetch(`${this.apiBase}/departments/${this.depId}/requests`)
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

  private setEditor(room: Room, request: Request) {
    // this.editor = !this.editor
    this.selectedRequest = { 
      "id": request !== null ? request.id : "", 
      "name": request !== null ? request.name : "", 
      "type": request !== null ? request.type : "", 
      "count": request !== null ? request.count : 0, 
      "description": request !== null ? request.description : "",
      "room": { "id": room !== null ? room.id : "", "name": room !== null ? room.name : "" } 
    }

    this.Clicked.emit({ path: request !== null ? request.id : "new" , req: this.selectedRequest, rooms: this.rooms })
  }

  private parseRooms(dep: DepartmentInfo) {
    this.rooms = dep.rooms.map(room => { return { "name": room.name, "id": room.id } })
  }

  async componentWillLoad() {
    this.info = await this.getDepartmentInfo();
    console.log(this.info)
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
      return <h1 class="error-msg">Something went wrong 😑</h1>
    }

    return (
      <Host>
        <h1>{this.info.name + ' - požiadavky'}</h1>
        <div class="container">
        { this.info.rooms.map(room => (
          <div>
            {/* <h3>{room.name}</h3> */}
            <md-list>
            { room.requests.map((req: Request) => (
              <div class="request-item">
                <md-divider/>
                <md-list-item
                  onClick={() => this.setEditor(room, req)}
                >
                  <div slot="headline">{req.name}</div>
                  <div slot="supporting-text">{"miesnosť: " + room.name}</div>
                  <div slot="supporting-text">{req.type === 'missing' ? `počet: ${req.count}` : `opis: ${req.description}`}</div>
                </md-list-item>
                <md-divider/>
              </div>
            ))}
            </md-list>
            {/* { room.requests.length == 0 && (
              <p>Miestnosť neobsahuje žiadne vybavenie</p>
            )} */}
          </div>
        ))} 
        </div>
        <div class="button-container">
          <md-filled-tonal-button class="back-button"
            onClick={() => window.navigation.navigate(new URL(this.basePath, document.baseURI))}>
              <md-icon class="icon" slot="icon">arrow_back</md-icon>
            Späť
          </md-filled-tonal-button>
          <md-filled-tonal-button class="add-request-button"
            onClick={() => this.setEditor(null, null)}
          >
            <md-icon class="icon" slot="icon">add</md-icon>
            Nová požiadavka
          </md-filled-tonal-button>
        </div>
      </Host>
    );
  }
}

type Request = {
  id: string,
  room_id: string,
  type: string,
  name: string,
  count: number | null,
  description: string
}

type Room = {
  name: string,
  id: string,
  requests: Request[]
}

type DepartmentInfo = {
  name: string,
  id: string,
  rooms: Room[]
}
