import { shield, and } from 'graphql-shield';

import { isAuthenticated } from './isAuthenticated';
import { isAdmin } from './isAdmin';
import { isFreeCourse } from './isFreeCourse';

export default shield({
  Query: {
    me: isAuthenticated,
    courses: isAuthenticated,
  },
  Mutation: {
    passwordChange: isAuthenticated,

    createFreeCourse: and(isAuthenticated, isFreeCourse),
    createAdminCourse: and(isAuthenticated, isAdmin),
  },
});
