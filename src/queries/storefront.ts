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
        imageUrl
      }
    }
  }
`;

export const GET_STOREFRONT_COURSES = gql`
  query GetStorefrontCourses {
    storefrontCourses {
      header
      courseId
      url
      imageUrl
    }
  }
`;
