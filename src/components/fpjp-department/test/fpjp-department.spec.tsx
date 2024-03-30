import { newSpecPage } from '@stencil/core/testing';
import { FpjpDepartment } from '../fpjp-department';

describe('fpjp-department', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [FpjpDepartment],
      html: `<fpjp-department></fpjp-department>`,
    });
    expect(page.root).toEqualHtml(`
      <fpjp-department>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </fpjp-department>
    `);
  });
});
