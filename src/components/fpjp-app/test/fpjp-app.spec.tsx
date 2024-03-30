import { newSpecPage } from '@stencil/core/testing';
import { FpjpApp } from '../fpjp-app';

describe('fpjp-app', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [FpjpApp],
      html: `<fpjp-app></fpjp-app>`,
    });
    expect(page.root).toEqualHtml(`
      <fpjp-app>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </fpjp-app>
    `);
  });
});
