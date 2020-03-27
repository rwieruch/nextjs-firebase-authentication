import { gql } from 'apollo-server-micro';

export default gql`
  extend type Query {
    me: User
  }

  type User {
    email: String!
    uid: String!
    username: String!
    roles: [String!]!
  }
`;
