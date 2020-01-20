import { gql } from 'apollo-server-micro';

export default gql`
  extend type Mutation {
    signIn(idToken: String!): SessionToken!
  }

  type SessionToken {
    sessionToken: String!
  }
`;
