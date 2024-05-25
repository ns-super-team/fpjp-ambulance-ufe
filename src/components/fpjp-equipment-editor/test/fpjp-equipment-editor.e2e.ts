import { newE2EPage } from '@stencil/core/testing';

describe('fpjp-equipment-editor', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<fpjp-equipment-editor></fpjp-equipment-editor>');

    const element = await page.find('fpjp-equipment-editor');
    expect(element).toHaveClass('hydrated');
  });
});
