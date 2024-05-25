import { Component, Host, Prop, State, h } from '@stencil/core';

declare global {
  interface Window { navigation: any; }
}

@Component({
  tag: 'fpjp-app',
  styleUrl: 'fpjp-app.css',
  shadow: true,
})
export class FpjpApp {
  @Prop() basePath  = "";
  @Prop() apiBase: string;

  @State() private relativePath = "";
  @State() private departmentID = "";
  @State() private departmentRooms: {"id": string, "name": string}[] = [];
  @State() private selectedEquipment: any;
  @State() private selectedRequest: any;

  componentWillLoad() {
    const baseUri = new URL(this.basePath, document.baseURI || "/").pathname;
    const toRelative = (path: string) => {
      if (path.startsWith(baseUri)) {
        this.relativePath = path.slice(baseUri.length)
      } else {
        this.relativePath = ""
      }
    }    
    // console.log(`basePath: ${this.basePath}, baseUri: ${document.baseURI}, relativePath: ${this.relativePath}, documentURL: ${document.URL}`) 

    window.navigation?.addEventListener("navigate", (ev: Event) => {
      if ((ev as any).canIntercept) { (ev as any).intercept(); }
      let path = new URL((ev as any).destination.url).pathname;
      toRelative(path);
    });
    
    toRelative(location.pathname)

    let sessionDepartmentID = sessionStorage.getItem("departmentID")
    if (sessionDepartmentID) this.departmentID = sessionDepartmentID
  }

  render() {
    let component = ""
    // console.log(this.departmentID)

    const navigate = (path: string) => {
      const absolute = new URL(path, new URL(this.basePath, document.baseURI)).pathname;
      // console.log(absolute)
      window.navigation.navigate(absolute)
    }
  
    if (document.URL.endsWith(window.location.host + "/")) {
      // component = "home"
      component = "overview"
    }

    if (document.URL.endsWith(this.basePath) || document.URL.endsWith(this.basePath.slice(0, -1))) {
      component = "overview";
    }
    
    if (this.relativePath.endsWith("equipment/")) {
      component = "equipment";
    }

    if (this.relativePath.endsWith("requests/")) {
      component = "requests";
    }

    if (this.relativePath.startsWith(`${this.departmentID}/equipment/editor/`)) {
      component = "equipment-editor"
    }

    if (this.relativePath.startsWith(`${this.departmentID}/requests/editor/`)) {
      component = "request-editor"
    }

    // console.log(`basePath: ${this.basePath}, baseUri: ${document.baseURI}, relativePath: ${this.relativePath}, documentURL: ${document.URL}`)
    // console.log(component, this.departmentID)
    
    const selectComponent = () => {
      if (component === "overview") {
        return (
          <fpjp-department-overview
            api-base={this.apiBase}
            onentry-clicked={(e: CustomEvent<any>) => {
              this.departmentID = e.detail.id;
              sessionStorage.setItem("departmentID", e.detail.id);
              // this.lastDepartment = e.detail.path;
              navigate(`./department/${this.departmentID}/${e.detail.path}/`);
            }}
          >
          </fpjp-department-overview>
        )
      } else if (component === "equipment") {
        return (
          <fpjp-department 
            base-path={this.basePath} 
            api-base={this.apiBase}
            dep-id={this.departmentID}
            on-clicked={(e: CustomEvent<any>) => {
              this.selectedEquipment = e.detail.eq;
              this.selectedRequest = e.detail.req;
              this.departmentRooms = e.detail.rooms;
              this.selectedEquipment ? 
                navigate(this.departmentID + "/equipment/editor/" + e.detail.path) :
                navigate(this.departmentID + "/requests/editor/" + e.detail.path)
            }}
          >
          </fpjp-department>
        )
      } else if (component === "requests") {
        return (
          <fpjp-department-requests
            base-path={this.basePath} 
            api-base={this.apiBase}
            dep-id={this.departmentID}
            on-clicked={(e: CustomEvent<any>) => {
              this.selectedRequest = e.detail.req;
              this.departmentRooms = e.detail.rooms;
              navigate(this.departmentID + "/requests/editor/" + e.detail.path)
            }}
          >
          </fpjp-department-requests>
        )
      } else if (component === "equipment-editor") {
        return (
          <fpjp-equipment-editor 
            api-base={this.apiBase}
            rooms={this.departmentRooms} 
            equipment={this.selectedEquipment}
            on-clicked={() => navigate(this.departmentID + "/equipment/")}
          >
          </fpjp-equipment-editor>
        )
      } else if (component === "request-editor") {
        return (
          <fpjp-request-editor 
            api-base={this.apiBase}
            rooms={this.departmentRooms} 
            request={this.selectedRequest}
            on-clicked={() => navigate(this.departmentID + "/requests/")}
          >
          </fpjp-request-editor>
        )
      } else if (component === "home") {
        return <h1> Home </h1>
      } else {
        return <h1 class="not-found">404 not found 🦧</h1>
      }
    }
  
    return (
      <Host>
        { selectComponent() }
      </Host>
    );
  }
}
  