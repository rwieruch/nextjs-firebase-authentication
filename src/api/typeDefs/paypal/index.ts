import { gql } from 'apollo-server-micro';

export default gql`
  extend type Mutation {
    paypalCreateOrder(
      courseId: CourseId!
      bundleId: BundleId!
      coupon: String
      partnerId: String
    ): OrderId!

    paypalApproveOrder(orderId: String!): Boolean
  }

  type OrderId {
    orderId: String!
  }
`;
