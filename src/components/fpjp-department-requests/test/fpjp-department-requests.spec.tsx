import { newSpecPage } from '@stencil/core/testing';
import { FpjpDepartmentRequests } from '../fpjp-department-requests';

describe('fpjp-department-requests', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [FpjpDepartmentRequests],
      html: `<fpjp-department-requests></fpjp-department-requests>`,
    });
    expect(page.root).toEqualHtml(`
      <fpjp-department-requests>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </fpjp-department-requests>
    `);
  });
});
