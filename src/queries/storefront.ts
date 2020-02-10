import gql from 'graphql-tag';

export const GET_STOREFRONT_COURSE = gql`
  query GetStorefrontCourse(
    $courseId: CourseId!
    $bundleId: BundleId!
  ) {
    storefrontCourse(courseId: $courseId, bundleId: $bundleId) {
      header
      courseId
      bundle {
        header
        bundleId
        price
      }
    }
  }
`;
