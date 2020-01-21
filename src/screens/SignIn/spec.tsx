import SignInPage from '.';

describe('SignInPage', () => {
  const noSession = null;
  const session = 'session';

  it('does render when not authorized', () => {
    expect(SignInPage.isAuthorized(noSession)).toEqual(true);
  });

  it('renders when authorized', () => {
    expect(SignInPage.isAuthorized(session)).toEqual(true);
  });
});
