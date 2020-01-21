import ReferralPage from '.';

describe('ReferralPage', () => {
  const noSession = null;
  const session = 'session';

  it('does not render when not authorized', () => {
    expect(ReferralPage.isAuthorized(noSession)).toEqual(false);
  });

  it('renders when authorized', () => {
    expect(ReferralPage.isAuthorized(session)).toEqual(true);
  });
});
