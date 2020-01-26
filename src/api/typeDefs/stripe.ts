import { gql } from 'apollo-server-micro';

export default gql`
  extend type Mutation {
    stripeCreateOrder(
      imageUrl: String!
      courseId: String!
      bundleId: String!
      coupon: String
    ): StripeId!
  }

  type StripeId {
    id: String!
  }
`;
