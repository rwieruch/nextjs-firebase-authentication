import { gql } from 'apollo-server-micro';

export default gql`
  extend type Mutation {
    signIn(idToken: String!): SessionToken!

    signUp(
      username: String!
      email: String!
      password: String!
    ): Boolean

    passwordForgot(email: String!): Boolean

    passwordChange(password: String!): Boolean
  }

  type SessionToken {
    sessionToken: String!
  }
`;
