import { gql } from 'apollo-server-micro';

export default gql`
  extend type Query {
    storefrontCourse(
      courseId: CourseId!
      bundleId: BundleId!
    ): StorefrontCourse
  }

  type StorefrontCourse {
    header: String!
    courseId: CourseId!
    bundle: Bundle!
  }

  type Bundle {
    header: String!
    bundleId: BundleId!
    price: Int!
  }
`;
