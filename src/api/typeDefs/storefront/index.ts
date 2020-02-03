import { gql } from 'apollo-server-micro';

export default gql`
  extend type Query {
    storefront(courseId: CourseId!, bundleId: BundleId!): Storefront
  }

  type Storefront {
    course: Course!
  }

  type Course {
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
