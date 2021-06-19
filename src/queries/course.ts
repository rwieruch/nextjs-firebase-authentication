import gql from 'graphql-tag';

export const GET_UNLOCKED_COURSES = gql`
  query GetCourses {
    unlockedCourses {
      courseId
      header
      url
      imageUrl
      canUpgrade
    }
  }
`;

export const GET_UNLOCKED_COURSE = gql`
  query GetCourse($courseId: String!) {
    unlockedCourse(courseId: $courseId) {
      courseId
      header
      canUpgrade
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
          items {
            label
            description
            url
            secondaryUrl
          }
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
  mutation CreateFreeCourse($courseId: String!, $bundleId: String!, $coupon: String!) {
    createFreeCourse(courseId: $courseId, bundleId: $bundleId, coupon: $coupon)
  }
`;

export const CREATE_ADMIN_COURSE = gql`
  mutation CreateAdminCourse(
    $uid: String!
    $courseId: String!
    $bundleId: String!
  ) {
    createAdminCourse(
      uid: $uid
      courseId: $courseId
      bundleId: $bundleId
    )
  }
`;
