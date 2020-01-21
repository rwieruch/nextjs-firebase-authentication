import PasswordChangePage from '.';

describe('PasswordChangePage', () => {
  const noSession = null;
  const session = 'session';

  it('does not render when not authorized', () => {
    expect(PasswordChangePage.isAuthorized(noSession)).toEqual(false);
  });

  it('renders when authorized', () => {
    expect(PasswordChangePage.isAuthorized(session)).toEqual(true);
  });
});
