import { gql } from 'apollo-server-micro';

export default gql`
  extend type Mutation {
    paypalCreateOrder(
      courseId: String!
      bundleId: String!
      coupon: String
    ): OrderId!

    paypalApproveOrder(
      courseId: String!
      bundleId: String!
      orderId: String!
    ): Boolean
  }

  type OrderId {
    orderId: String!
  }
`;
