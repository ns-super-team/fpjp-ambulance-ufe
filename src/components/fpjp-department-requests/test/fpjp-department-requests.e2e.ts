import { newE2EPage } from '@stencil/core/testing';

describe('fpjp-department-requests', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<fpjp-department-requests></fpjp-department-requests>');

    const element = await page.find('fpjp-department-requests');
    expect(element).toHaveClass('hydrated');
  });
});
