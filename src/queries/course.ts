import gql from 'graphql-tag';

export const GET_UNLOCKED_COURSES = gql`
  query GetCourses {
    unlockedCourses {
      courseId
      header
      url
      imageUrl
    }
  }
`;

export const GET_UNLOCKED_COURSE = gql`
  query GetCourse($courseId: CourseId!) {
    unlockedCourse(courseId: $courseId) {
      courseId
      header
      introduction {
        label
        data {
          label
          description
          url
        }
      }
      onboarding {
        label
        data {
          label
          description
          url
        }
      }
      bookDownload {
        label
        data {
          items {
            label
            description
            url
            fileName
          }
        }
      }
      bookOnline {
        label
        data {
          chapters {
            label
            url
            sections {
              label
              url
            }
          }
        }
      }
      curriculum {
        label
        data {
          sections {
            label
            items {
              kind
              label
              description
              url
              secondaryUrl
            }
          }
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
