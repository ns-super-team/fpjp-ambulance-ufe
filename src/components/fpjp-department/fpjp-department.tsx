import { Component, Host, h, State, Prop } from '@stencil/core';

@Component({
  tag: 'fpjp-department',
  styleUrl: 'fpjp-department.css',
  shadow: true,
})
export class FpjpDepartment {
  @Prop() depId: string;
  @Prop() basePath: string;
  
  @State() info: any = [];
  @State() editor: Boolean = false;

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

  private setEditor() {
    this.editor = !this.editor
  }

  async componentWillLoad() {
    this.info = await this.getDepartmentInfo();
  }

  render() {
    return (
      <Host>
        { this.editor ? (
          <div class="editor-container">
            <fpjp-equipment-editor rooms={["Miestnosť 1", "Miestnosť 2"]}></fpjp-equipment-editor>
          </div>
        ) : (
          <div>
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
                  onClick={() => this.setEditor()}>
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

const dep = {
  name: 'Pediatrické oddelenie',
  id: '759413c5-840e-42c3-9e1e-abaa5d4c997f',
  rooms: [
    {
      name: 'Miestnosť 1',
      equipment: [
        {
          type: 'vybavenie',
          name: 'striekačka',
          count: '10'
        },
        {
          type: 'vybavenie',
          name: 'rukavice',
          count: '20'
        },
        {
          type: 'nábytok',
          name: 'kancelársky stôl',
          count: '1'
        },
        {
          type: 'nábytok',
          name: 'stolička',
          count: '2'
        },
      ]
    },
    {
      name: 'Miestnosť 2',
      equipment: [
        {
          type: 'nábytok',
          name: 'posteľ',
          count: '4'
        },
        {
          type: 'nábytok',
          name: 'stolička',
          count: '4'
        },
      ]
    }
  ]
}