import CourseItemPage from '.';

describe('CourseItemPage', () => {
  const noSession = null;
  const session = 'session';

  it('does not render when not authorized', () => {
    expect(CourseItemPage.isAuthorized(noSession)).toEqual(false);
  });

  it('renders when authorized', () => {
    expect(CourseItemPage.isAuthorized(session)).toEqual(true);
  });
});
