import AccountPage from '.';

describe('AccountPage', () => {
  const noSession = null;
  const session = 'session';

  it('does not render when not authorized', () => {
    expect(AccountPage.isAuthorized(noSession)).toEqual(false);
  });

  it('renders when authorized', () => {
    expect(AccountPage.isAuthorized(session)).toEqual(true);
  });
});
