import { gql } from 'apollo-server-micro';

export default gql`
  type Query {
    me: User
  }

  type User {
    email: String!
    uid: String!
  }

  type Mutation {
    signIn(idToken: String!): SessionToken!
  }

  type SessionToken {
    sessionToken: String!
  }
`;
