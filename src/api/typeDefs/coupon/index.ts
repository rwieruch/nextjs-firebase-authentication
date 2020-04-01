import { gql } from 'apollo-server-micro';

export default gql`
  extend type Query {
    discountedPrice(
      courseId: CourseId!
      bundleId: BundleId!
      coupon: String!
    ): Discount!
  }

  extend type Mutation {
    couponCreate(
      coupon: String!
      discount: Int!
      count: Int!
    ): Boolean
  }

  type Discount {
    price: Int!
    isDiscount: Boolean!
  }
`;
