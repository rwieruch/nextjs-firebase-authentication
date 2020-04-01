import PartnerPage from '.';

describe('PartnerPage', () => {
  const noSession = null;
  const session = 'session';

  it('does not render when not authorized', () => {
    expect(PartnerPage.isAuthorized(noSession)).toEqual(false);
  });

  it('renders when authorized', () => {
    expect(PartnerPage.isAuthorized(session)).toEqual(true);
  });
});
