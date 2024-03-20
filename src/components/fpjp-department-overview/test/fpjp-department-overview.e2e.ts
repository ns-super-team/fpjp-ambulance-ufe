import { newE2EPage } from '@stencil/core/testing';

describe('fpjp-department-overview', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<fpjp-department-overview></fpjp-department-overview>');

    const element = await page.find('fpjp-department-overview');
    expect(element).toHaveClass('hydrated');
  });
});
