import { gql } from 'apollo-server-micro';

export default gql`
  extend type Mutation {
    communityJoin(email: String!): Boolean
  }
`;
