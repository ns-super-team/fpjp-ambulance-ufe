import { newSpecPage } from '@stencil/core/testing';
import { FpjpDepartmentOverview } from '../fpjp-department-overview';

describe('fpjp-department-overview', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [FpjpDepartmentOverview],
      html: `<fpjp-department-overview></fpjp-department-overview>`,
    });
    expect(page.root).toEqualHtml(`
      <fpjp-department-overview>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </fpjp-department-overview>
    `);
  });
});
