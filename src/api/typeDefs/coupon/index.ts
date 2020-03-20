import { gql } from 'apollo-server-micro';

export default gql`
  extend type Query {
    discountedPrice(
      courseId: CourseId!
      bundleId: BundleId!
      coupon: String!
    ): Discount!
  }

  type Discount {
    price: Int!
    isDiscount: Boolean!
  }
`;
