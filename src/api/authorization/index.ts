import { shield, and } from 'graphql-shield';

import { isAuthenticated } from './isAuthenticated';
import { isAdmin } from './isAdmin';
import { isFreeCourse } from './isFreeCourse';

export default shield({
  Query: {
    me: isAuthenticated,

    discountedPrice: isAuthenticated,
  },
  Mutation: {
    migrate: and(isAuthenticated, isAdmin),

    passwordChange: isAuthenticated,

    createFreeCourse: and(isAuthenticated, isFreeCourse),
    createAdminCourse: and(isAuthenticated, isAdmin),

    promoteToPartner: and(isAuthenticated, isAdmin),
  },
});
