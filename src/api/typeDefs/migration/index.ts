import { gql } from 'apollo-server-micro';

export default gql`
  extend type Mutation {
    migrate(migrationType: String!): Boolean
  }
`;
