import CourseList from '.';

describe('CourseList', () => {
  const noSession = null;
  const session = 'session';

  it('renders when not authorized', () => {
    expect(CourseList.isAuthorized(noSession)).toEqual(true);
  });

  it('renders when authorized', () => {
    expect(CourseList.isAuthorized(session)).toEqual(true);
  });
});
