import { gql } from 'apollo-server-micro';

export default gql`
  extend type Query {
    getStorefront(courseId: String, bundleId: String): Storefront
  }

  type Storefront {
    course: Course
  }

  type Course {
    header: String!
    courseId: String!
    bundle: Bundle!
  }

  type Bundle {
    header: String!
    bundleId: String!
    price: Int!
  }
`;
