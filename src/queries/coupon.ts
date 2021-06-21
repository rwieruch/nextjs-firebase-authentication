import gql from 'graphql-tag';

export const GET_DISCOUNTED_PRICE = gql`
  query GetDiscountedPrice(
    $courseId: String!
    $bundleId: String!
    $coupon: String!
  ) {
    discountedPrice(
      courseId: $courseId
      bundleId: $bundleId
      coupon: $coupon
    ) {
      price
      isDiscount
    }
  }
`;

export const COUPON_CREATE = gql`
  mutation CouponCreate(
    $coupon: String!
    $discount: Float!
    $count: Float!
    $courseId: String!
    $bundleId: String!
  ) {
    couponCreate(
      coupon: $coupon
      discount: $discount
      count: $count
      courseId: $courseId
      bundleId: $bundleId
    )
  }
`;
