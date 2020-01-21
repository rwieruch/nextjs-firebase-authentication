import SignUpPage from '.';

describe('SignUpPage', () => {
  const noSession = null;
  const session = 'session';

  it('does render when not authorized', () => {
    expect(SignUpPage.isAuthorized(noSession)).toEqual(true);
  });

  it('renders when authorized', () => {
    expect(SignUpPage.isAuthorized(session)).toEqual(true);
  });
});
