import gql from 'graphql-tag';

export const GET_UNLOCKED_COURSES = gql`
  query GetCourses {
    unlockedCourses {
      courseId
      imageUrl
    }
  }
`;

export const GET_UNLOCKED_COURSE = gql`
  query GetCourse($courseId: CourseId!) {
    unlockedCourse(courseId: $courseId) {
      courseId
      sections {
        label
        items {
          kind
          label
          url
          fileName
          secondaryUrl
        }
      }
    }
  }
`;

export const CREATE_FREE_COURSE = gql`
  mutation CreateFreeCourse(
    $courseId: CourseId!
    $bundleId: BundleId!
  ) {
    createFreeCourse(courseId: $courseId, bundleId: $bundleId)
  }
`;

export const CREATE_ADMIN_COURSE = gql`
  mutation CreateAdminCourse(
    $uid: String!
    $courseId: CourseId!
    $bundleId: BundleId!
  ) {
    createAdminCourse(
      uid: $uid
      courseId: $courseId
      bundleId: $bundleId
    )
  }
`;
