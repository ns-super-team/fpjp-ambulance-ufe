import { newSpecPage } from '@stencil/core/testing';
import { FpjpEquipmentEditor } from '../fpjp-equipment-editor';

describe('fpjp-equipment-editor', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [FpjpEquipmentEditor],
      html: `<fpjp-equipment-editor></fpjp-equipment-editor>`,
    });
    expect(page.root).toEqualHtml(`
      <fpjp-equipment-editor>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </fpjp-equipment-editor>
    `);
  });
});
