import gql from 'graphql-tag';

export const GET_UPGRADEABLE_COURSES = gql`
  query GetUpgradeableCourses($courseId: CourseId!) {
    upgradeableCourses(courseId: $courseId) {
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
