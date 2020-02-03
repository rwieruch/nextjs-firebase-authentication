import { gql } from 'apollo-server-micro';

export default gql`
  extend type Mutation {
    signIn(email: String!, password: String!): SessionToken!

    signUp(
      username: String!
      email: String!
      password: String!
    ): SessionToken!

    passwordForgot(email: String!): Boolean

    passwordChange(password: String!): Boolean
  }

  type SessionToken {
    sessionToken: String!
  }
`;
