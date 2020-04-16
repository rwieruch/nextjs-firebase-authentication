import { shield, and } from 'graphql-shield';

import { isAuthenticated } from './isAuthenticated';
import { isAdmin } from './isAdmin';
import { isPartner } from './isPartner';
import { isFreeCourse } from './isFreeCourse';

export default shield({
  Query: {
    // me: isAuthenticated,
    // discountedPrice: isAuthenticated,

    // Partner

    partnerVisitors: and(isAuthenticated, isPartner),
    partnerSales: and(isAuthenticated, isPartner),
    partnerPayments: and(isAuthenticated, isPartner),
  },
  Mutation: {
    // passwordChange: isAuthenticated,
    // emailChange: isAuthenticated,
    communityJoin: isAuthenticated,

    // Admin

    migrate: and(isAuthenticated, isAdmin),
    promoteToPartner: and(isAuthenticated, isAdmin),
    couponCreate: and(isAuthenticated, isAdmin),
    createAdminCourse: and(isAuthenticated, isAdmin),

    // Free

    createFreeCourse: and(isAuthenticated, isFreeCourse),
  },
});
