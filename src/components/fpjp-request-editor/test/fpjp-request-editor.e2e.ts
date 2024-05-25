import { newE2EPage } from '@stencil/core/testing';

describe('fpjp-request-editor', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<fpjp-request-editor></fpjp-request-editor>');

    const element = await page.find('fpjp-request-editor');
    expect(element).toHaveClass('hydrated');
  });
});
