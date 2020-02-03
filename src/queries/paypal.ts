import gql from 'graphql-tag';

export const PAYPAL_CREATE_ORDER = gql`
  mutation PaypalCreateOrder(
    $courseId: CourseId!
    $bundleId: BundleId!
    $coupon: String
  ) {
    paypalCreateOrder(
      courseId: $courseId
      bundleId: $bundleId
      coupon: $coupon
    ) {
      orderId
    }
  }
`;

export const PAYPAL_APPROVE_ORDER = gql`
  mutation PaypalApproveOrder($orderId: String!) {
    paypalApproveOrder(orderId: $orderId)
  }
`;
