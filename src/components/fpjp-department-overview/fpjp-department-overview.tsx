import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'fpjp-department-overview',
  styleUrl: 'fpjp-department-overview.css',
  shadow: true,
})
export class FpjpDepartmentOverview {

  departments: any[];

  private async getDepartments(){
    return await Promise.resolve(
      [{
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
      },
      {
        name: 'AGHGSHAGDSHGFA',
        id: 'dhdgsahfdsahg'
      }]
    );
  }

  async componentWillLoad() {
    this.departments = await this.getDepartments();
  }

  render() {
    return (
      <Host>
        <md-list>
          {this.departments.map(department =>
          <div>
            <md-list-item interactive href="">
              <div slot="headline">{department.name}</div>
            </md-list-item>
          </div>
          )}
        </md-list>
      </Host>
    );
  }

}