import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
  mergeSchemas,
} from 'graphql-tools';
import { gql } from 'apollo-server-micro';

export default makeExecutableSchema({
  typeDefs: `
  type Query {
    me: User
  }

  type User {
    email: String!
    uid: String!
  }
`,
});
