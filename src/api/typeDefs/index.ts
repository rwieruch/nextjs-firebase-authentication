import { gql } from 'apollo-server-express';

import sessionSchema from './session';
import userSchema from './user';
import storefrontSchema from './storefront';
import paypalSchema from './paypal';
import stripeSchema from './stripe';
import courseSchema from './course';

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export default [
  linkSchema,
  sessionSchema,
  userSchema,
  storefrontSchema,
  paypalSchema,
  stripeSchema,
  courseSchema,
];
