import { gql } from 'apollo-server-micro';

export default gql`
  extend type Mutation {
    createFreeCourse(courseId: String!, bundleId: String!): Boolean!
  }
`;
