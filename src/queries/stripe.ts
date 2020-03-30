import gql from 'graphql-tag';

export const STRIPE_CREATE_ORDER = gql`
  mutation StripeCreateOrder(
    $imageUrl: String!
    $courseId: CourseId!
    $bundleId: BundleId!
    $coupon: String
    $partnerId: String
  ) {
    stripeCreateOrder(
      imageUrl: $imageUrl
      courseId: $courseId
      bundleId: $bundleId
      coupon: $coupon
      partnerId: $partnerId
    ) {
      id
    }
  }
`;
