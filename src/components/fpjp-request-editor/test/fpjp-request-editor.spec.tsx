import { newSpecPage } from '@stencil/core/testing';
import { FpjpRequestEditor } from '../fpjp-request-editor';

describe('fpjp-request-editor', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [FpjpRequestEditor],
      html: `<fpjp-request-editor></fpjp-request-editor>`,
    });
    expect(page.root).toEqualHtml(`
      <fpjp-request-editor>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </fpjp-request-editor>
    `);
  });
});
