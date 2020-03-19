import { gql } from 'apollo-server-micro';

export default gql`
  extend type Query {
    storefrontCourse(
      courseId: CourseId!
      bundleId: BundleId!
    ): StorefrontCourse

    storefrontCourses: [StorefrontCourse!]!
  }

  type StorefrontCourse {
    header: String!
    courseId: CourseId!
    url: String!
    imageUrl: String!
    canUpgrade: Boolean!
    bundle: StorefrontBundle!
  }

  type StorefrontBundle {
    header: String!
    bundleId: BundleId!
    price: Int!
    imageUrl: String!
    benefits: [String!]!
  }
`;
