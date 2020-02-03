import { gql } from 'apollo-server-express';

import sessionSchema from './session';
import userSchema from './user';
import storefrontSchema from './storefront';
import paypalSchema from './paypal';
import stripeSchema from './stripe';
import courseSchema from './course';

const linkSchema = gql`
  enum CourseId {
    THE_ROAD_TO_LEARN_REACT
    TAMING_THE_STATE
    THE_ROAD_TO_GRAPHQL
    THE_ROAD_TO_REACT_WITH_FIREBASE
  }

  enum BundleId {
    STUDENT
    INTERMEDIATE
    PROFESSIONAL
  }

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
