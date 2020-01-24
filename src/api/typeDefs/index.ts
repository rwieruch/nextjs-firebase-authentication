import { gql } from 'apollo-server-express';

import sessionSchema from './session';
import userSchema from './user';
import storefrontSchema from './storefront';

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
];
