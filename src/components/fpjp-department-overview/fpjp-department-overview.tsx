import { Component, h, Event, EventEmitter, State, Prop, Host } from '@stencil/core';

@Component({
  tag: 'fpjp-department-overview',
  styleUrl: 'fpjp-department-overview.css',
  shadow: true,
})
export class FpjpDepartmentOverview {
  @Prop() apiBase: string;
  
  @Event({ eventName: "entry-clicked"}) entryClicked: EventEmitter<any>;
  
  @State() departments: Department[];
  @State() loading = true;
  @State() error = false;

  private async getDepartments(): Promise<Department[]> {
    return fetch(`${this.apiBase}/departments/`)
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
  
  async componentWillLoad() {
    this.departments = await this.getDepartments();
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
        <h1 class="heading">Prehľad oddelení</h1>
        <md-list>
          { this.departments.map(department => (
          <div>
            <md-list-item>
              <div slot="headline">{department.name}</div>
              <md-text-button class="navigation-buttons" slot="end"
                onClick={ () => this.entryClicked.emit({ path: "equipment", id: department.id })}
              >
                Vybavenie
              </md-text-button>
              <md-text-button class="navigation-buttons" slot="end"
                onClick={ () => this.entryClicked.emit({ path: "requests", id: department.id })}
              >
                Požiadavky
              </md-text-button>
            </md-list-item>
          </div>
          ))}
        </md-list>
      </Host>
    );
  }
}

type Department = {
  name: string,
  id: string
}
