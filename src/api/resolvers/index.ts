import { resolvers as sessionResolvers } from './session';
import { resolvers as userResolvers } from './user';
import { resolvers as storefrontResolvers } from './storefront';
import { resolvers as paypalResolvers } from './paypal';
import { resolvers as stripeResolvers } from './stripe';
import { resolvers as courseResolvers } from './course';
import { resolvers as bookResolvers } from './book';
import { resolvers as upgradeResolvers } from './upgrade';

export default [
  sessionResolvers,
  userResolvers,
  storefrontResolvers,
  paypalResolvers,
  stripeResolvers,
  courseResolvers,
  bookResolvers,
  upgradeResolvers,
];
