import { Component, Host, h, State, Prop } from '@stencil/core';

@Component({
  tag: 'fpjp-department',
  styleUrl: 'fpjp-department.css',
  shadow: true,
})
export class FpjpDepartment {
  @State() info: any = [];
  @Prop() depId: string;
  @Prop() basePath: string;

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

  async componentWillLoad() {
    this.info = await this.getDepartmentInfo();
  }

  render() {
    return (
      <Host>
        <h1>{this.info.name + ' - vybavenie'}</h1>
        <div class="container">
        { this.info.rooms.map(room => (
          <div>
            <h3>{room.name}</h3>
              <md-list>
              { room.equipment.map(eq => (
                <md-list-item>
                  <div slot="headline">{eq.name}</div>
                  <div slot="supporting-text">{eq.type}</div>
                  { eq.type === "vybavenie" ?
                      <md-icon slot="start">vaccines</md-icon>
                    :
                      <md-icon slot="start">chair</md-icon>
                  }
                  <div slot="trailing-supporting-text">{"pocet: " + eq.count}</div>
                </md-list-item>
              ))}
            </md-list>
          </div>
        ))} 
        <md-filled-tonal-button class="back-button"
          onClick={() => window.navigation.navigate(new URL(this.basePath, document.baseURI))}>
            <md-icon class="icon" slot="icon">arrow_back</md-icon>
          Späť
        </md-filled-tonal-button>
        </div>
      </Host>
    );
  }
}

const dep = {
  name: 'Pediatrické oddelenie',
  id: '759413c5-840e-42c3-9e1e-abaa5d4c997f',
  rooms: [
    {
      name: 'Miestnost 1',
      equipment: [
        {
          type: 'vybavenie',
          name: 'striekacka',
          count: '10'
        },
        {
          type: 'vybavenie',
          name: 'rukavice',
          count: '20'
        },
        {
          type: 'nabytok',
          name: 'kancelarsky stol',
          count: '1'
        },
        {
          type: 'nabytok',
          name: 'stolicka',
          count: '2'
        },
      ]
    },
    {
      name: 'Miestnost 2',
      equipment: [
        {
          type: 'nabytok',
          name: 'postel',
          count: '4'
        },
        {
          type: 'nabytok',
          name: 'stolicka',
          count: '4'
        },
      ]
    }
  ]
}