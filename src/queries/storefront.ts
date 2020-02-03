import gql from 'graphql-tag';

export const GET_STOREFRONT = gql`
  query GetStorefront($courseId: CourseId, $bundleId: BundleId) {
    storefront(courseId: $courseId, bundleId: $bundleId) {
      course {
        header
        courseId
        bundle {
          header
          bundleId
          price
        }
      }
    }
  }
`;
