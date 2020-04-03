import CommunityJoinPage from '.';

describe('CommunityJoinPage', () => {
  const noSession = null;
  const session = 'session';

  it('does not render when not authorized', () => {
    expect(CommunityJoinPage.isAuthorized(noSession)).toEqual(false);
  });

  it('renders when authorized', () => {
    expect(CommunityJoinPage.isAuthorized(session)).toEqual(true);
  });
});
