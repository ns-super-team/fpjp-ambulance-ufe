import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'fpjp-equipment-editor',
  styleUrl: 'fpjp-equipment-editor.css',
  shadow: true,
})
export class FpjpEquipmentEditor {
  @Prop() rooms: string[] = [""];

  render() {
    return (
      <Host>
        <div class="form-container">
          <h2>Pridať nové vybavenie | Editácia vybavenia</h2>
          <form class="equipment-form">
            <div class="input-container">
              Typ vybavenia
              <md-outlined-select class="selector">
                {/* <md-select-option selected aria-label="blank"></md-select-option> */}
                <md-select-option value="nabytok">
                  <div slot="headline">Nábytok</div>
                </md-select-option>
                <md-select-option value="vybavenie">
                  <div slot="headline">Medicínske vybavenie</div>
                </md-select-option>
              </md-outlined-select>
            </div>
            <div class="horizontal-inputs">
              <div class="input-container-name">
                Názov vybavenia
                <md-outlined-text-field class="text-field"></md-outlined-text-field>
              </div>
              <div class="input-container-quantity">
                Počet
                <md-outlined-text-field 
                  type="number" 
                  pattern="^[0-9]*$" 
                  min="1" 
                  class="text-field"
                  onKeyPress={(event: any) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                >
                  {/* <md-icon slot="leading-icon">fingerprint</md-icon> */}
                </md-outlined-text-field>
              </div>
            </div>
            <div class="input-container">
              Miestnosť
              <md-outlined-select class="selector">
                {this.rooms.map(room =>
                  <md-select-option value={room}>
                    <div slot="headline">{room}</div>
                  </md-select-option>
                )}
              </md-outlined-select>
            </div>
          </form>
          <div class="button-container">
            <md-filled-tonal-button class="back-button"
              onClick={() => console.log()}>
                <md-icon class="icon" slot="icon">arrow_back</md-icon>
              Späť
            </md-filled-tonal-button>
            <md-filled-tonal-button class="save-button"
              onClick={() => console.log()}>
                <md-icon class="icon" slot="icon">save</md-icon>
              Uložiť
            </md-filled-tonal-button>
          </div>
        </div>
      </Host>
    );
  }
}