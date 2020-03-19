import { gql } from 'apollo-server-micro';

export default gql`
  extend type Query {
    storefrontCourse(
      courseId: CourseId!
      bundleId: BundleId!
    ): StorefrontCourse

    storefrontBundles(courseId: CourseId!): [StorefrontBundle!]!

    storefrontCourses: [StorefrontCourse!]!
  }

  type StorefrontCourse {
    header: String!
    courseId: CourseId!
    url: String!
    imageUrl: String
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
