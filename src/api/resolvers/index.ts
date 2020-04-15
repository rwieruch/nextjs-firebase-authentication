import MigrationResolvers from './migration';
import SessionResolver from './session';
import UserResolvers from './user';
import StorefrontResolvers from './storefront';
import PaypalResolvers from './paypal';
import StripeResolvers from './stripe';
import CourseResolvers from './course';
import BookResolvers from './book';
import UpgradeResolvers from './upgrade';
import CouponResolver from './coupon';
import PartnerResolver from './partner';
import CommunityResolvers from './community';

export default [
  MigrationResolvers,
  SessionResolver,
  UserResolvers,
  StorefrontResolvers,
  PaypalResolvers,
  StripeResolvers,
  CourseResolvers,
  BookResolvers,
  UpgradeResolvers,
  CouponResolver,
  PartnerResolver,
  CommunityResolvers,
];
