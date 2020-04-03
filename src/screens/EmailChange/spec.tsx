import EmailChangePage from '.';

describe('EmailChangePage', () => {
  const noSession = null;
  const session = 'session';

  it('does not render when not authorized', () => {
    expect(EmailChangePage.isAuthorized(noSession)).toEqual(false);
  });

  it('renders when authorized', () => {
    expect(EmailChangePage.isAuthorized(session)).toEqual(true);
  });
});
