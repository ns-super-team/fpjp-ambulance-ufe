import { newE2EPage } from '@stencil/core/testing';

describe('fpjp-app', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<fpjp-app></fpjp-app>');

    const element = await page.find('fpjp-app');
    expect(element).toHaveClass('hydrated');
  });
});
