import { Component, h, Event, EventEmitter, State, Prop } from '@stencil/core';

@Component({
  tag: 'fpjp-department-overview',
  styleUrl: 'fpjp-department-overview.css',
  shadow: true,
})
export class FpjpDepartmentOverview {
  @Prop() apiBase: string;
  @Event({ eventName: "entry-clicked"}) entryClicked: EventEmitter<any>;
  @State() departments: Department[];

  private async getDepartments(): Promise<Department[]> {
    return await Promise.resolve(mockedData)
    // return fetch('http://localhost:8000/')
    // .then((r) => { return r.json() })
    // .catch(()=> { 
    //   console.log('error')
    //   return mockedData;
    // })
  }
  
  async componentWillLoad() {
    this.departments = await this.getDepartments();
  }

  private convertString(input: string): string {
     // Remove accented characters
     const convertedString = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
     // Replace spaces with '-'
     return convertedString.replace(/\s+/g, '-');
}

  render() {
    return (
      // <Host>
      <main>
        <h1 class="heading">Prehľad oddelení</h1>
        <md-list>
          { this.departments.map(department => (
          <div>
            <md-list-item interactive 
              onClick={ () => this.entryClicked.emit({ path: this.convertString(department.name), id: department.id })}
            >
              <div slot="headline">{department.name}</div>
              <md-icon slot="end">chevron_right</md-icon>
            </md-list-item>
          </div>
          ))}
        </md-list>
      </main>
      // </Host>
    );
  }
}

type Department = {
  name: string,
  id: string
}

const mockedData: Department[] = [
  {
    name: 'Pediatrické oddelenie',
    id: '759413c5-840e-42c3-9e1e-abaa5d4c997f'
  },
  {
    name: 'Alergológia',
    id: '3e84ecb0-dd42-4071-a163-d6c2d95cfcdc'
  },
  {
    name: 'Chirurgia',
    id: '673c60aa-288c-40fd-abe7-81112c760109'
  },
  {
    name: 'Ortopédia',
    id: '1a81b385-332c-43ab-b389-206ddf766b5c'
  }
]