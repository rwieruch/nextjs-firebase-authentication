import PasswordForgotPage from '.';

describe('PasswordForgotPage', () => {
  const noSession = null;
  const session = 'session';

  it('does render when not authorized', () => {
    expect(PasswordForgotPage.isAuthorized(noSession)).toEqual(true);
  });

  it('renders when authorized', () => {
    expect(PasswordForgotPage.isAuthorized(session)).toEqual(true);
  });
});
