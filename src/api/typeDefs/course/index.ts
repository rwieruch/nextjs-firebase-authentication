import { gql } from 'apollo-server-micro';

export default gql`
  extend type Mutation {
    createFreeCourse(
      courseId: CourseId!
      bundleId: BundleId!
    ): Boolean!

    createAdminCourse(
      uid: String!
      courseId: CourseId!
      bundleId: BundleId!
    ): Boolean!
  }
`;
