import CheckoutPage from '.';

describe('CheckoutPage', () => {
  const noSession = null;
  const session = 'session';

  it('does render when not authorized', () => {
    expect(CheckoutPage.isAuthorized(noSession)).toEqual(true);
  });

  it('renders when authorized', () => {
    expect(CheckoutPage.isAuthorized(session)).toEqual(true);
  });
});
