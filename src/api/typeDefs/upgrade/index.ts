import { gql } from 'apollo-server-micro';

export default gql`
  extend type Query {
    upgradeableCourses(courseId: CourseId!): [StorefrontCourse!]!
  }
`;
