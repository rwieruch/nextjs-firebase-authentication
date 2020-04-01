import { shield, and } from 'graphql-shield';

import { isAuthenticated } from './isAuthenticated';
import { isAdmin } from './isAdmin';
import { isPartner } from './isPartner';
import { isFreeCourse } from './isFreeCourse';

export default shield({
  Query: {
    me: isAuthenticated,

    // Coupon

    discountedPrice: isAuthenticated,

    // Partner

    partnerVisitors: and(isAuthenticated, isPartner),
    partnerSales: and(isAuthenticated, isPartner),
    partnerPayments: and(isAuthenticated, isPartner),
  },
  Mutation: {
    migrate: and(isAuthenticated, isAdmin),

    // Session

    passwordChange: isAuthenticated,

    // Course

    createFreeCourse: and(isAuthenticated, isFreeCourse),
    createAdminCourse: and(isAuthenticated, isAdmin),

    // Partner

    promoteToPartner: and(isAuthenticated, isAdmin),
  },
});
