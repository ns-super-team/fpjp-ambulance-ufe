import { newE2EPage } from '@stencil/core/testing';

describe('fpjp-department', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<fpjp-department></fpjp-department>');

    const element = await page.find('fpjp-department');
    expect(element).toHaveClass('hydrated');
  });
});
