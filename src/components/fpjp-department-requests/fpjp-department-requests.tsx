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
  @State() requests: Request[];
  @State() rooms: {"id": string, "name": string}[] = [];
  @State() loading = true;
  @State() error = false;
  @State() errorMsg = "";
  
  // load initial data
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

  // open editor for request
  private setEditor(room: Room, request: Request) {
    const selectedRequest = { 
      "id": request !== null ? request.id : "", 
      "name": request !== null ? request.name : "", 
      "type": request !== null ? request.type : "", 
      "count": request !== null ? request.count : 0, 
      "description": request !== null ? request.description : "",
      "room": { "id": room !== null ? room.id : "", "name": room !== null ? room.name : "" } 
    }

    this.Clicked.emit({ path: request !== null ? request.id : "new" , req: selectedRequest, rooms: this.rooms })
  }

  private parseRooms(dep: DepartmentInfo) {
    this.rooms = dep.rooms.map(room => { return { "name": room.name, "id": room.id } })
  }

  private async handleDelete(roomID: string, id: string) {
    await fetch(`${this.apiBase}/requests/${id}`, {
      method: "DELETE"
    })
    .then((response) => {
      if (response.ok) {
        this.info = {
          ...this.info,
          rooms: this.info.rooms.map(room => {
            if (room.id === roomID) {
              return {
                ...room,
                requests: room.requests.filter(request => request.id !== id)
              };
            }
            return room;
          })
        };
      } else {
        return Promise.reject(response);
      }
    })
    .catch((response) => {
      response.json().then((msg: any) => console.log("Error: ", msg))
      this.errorMsg = `The server responded with ${response.status} (${response.statusText})`
    })
  }

  private renderNoRequestsAlert() {
    let requestCount = 0;
    this.info.rooms.forEach(room => {
      requestCount += room.requests.length;
    })
    
    if (requestCount === 0) {
      return <p>Oddelenie neobsahuje žiadne požiadavky</p>
    } else {
      return null;
    }
  }

  async componentWillLoad() {
    this.info = await this.getDepartmentInfo();
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
        <h1>{this.info.name + ' - požiadavky'}</h1>
        <div class="container">
        { this.info.rooms.map(room => (
          <div>
            {/* <h3>{room.name}</h3> */}
            <md-list>
            { room.requests.map((req: Request) => (
              <div class="request-item" key={req.id}>
                <md-list-item 
                  class={req.type === "missing" ? "list-missing" : "list-broken"}
                  onClick={() => this.setEditor(room, req)}
                >
                  <div slot="headline"><b>{req.name}</b></div>
                  <div slot="supporting-text"><b>miestnosť: </b>{room.name}</div>
                  {req.type === 'missing' ? (
                      <div slot="supporting-text"><b>počet: </b>{req.count}</div>
                    ) : (
                      <div slot="supporting-text"><b>opis: </b>{req.description}</div>
                  )}
                  <div slot="end" class="done-button">
                    <md-text-button 
                      onClick={(event: any) => {
                        event.stopPropagation();
                        this.handleDelete(room.id, req.id)
                      }}
                    >
                      <md-icon class="icon" slot="icon">check</md-icon>
                      Vybavené
                    </md-text-button>
                  </div>
                </md-list-item>
              </div>
            ))}
            </md-list>
          </div>
        ))} 
        { this.renderNoRequestsAlert() }
        </div>
        { this.errorMsg !== "" &&(
          <md-dialog class="dialog" type="alert" open={this.errorMsg !== ""}>
            <div slot="headline">Niečo sa pokazilo 🙄</div>
            <form id="form" slot="content" method="dialog">
              {this.errorMsg}
            </form>
            <div slot="actions">
              <md-text-button form="form" value="ok"
                onClick={() => this.errorMsg = ""}
              >
                OK
              </md-text-button>
            </div>
          </md-dialog>
        )}
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
  room: string,
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
