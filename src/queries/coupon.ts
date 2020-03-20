import gql from 'graphql-tag';

export const GET_DISCOUNTED_PRICE = gql`
  query GetDiscountedPrice(
    $courseId: CourseId!
    $bundleId: BundleId!
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
