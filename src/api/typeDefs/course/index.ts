import { gql } from 'apollo-server-micro';

export default gql`
  extend type Query {
    courses: [UnlockedCourse!]!
  }

  extend type Mutation {
    createFreeCourse(
      courseId: CourseId!
      bundleId: BundleId!
    ): Boolean!

    createAdminCourse(
      uid: String!
      courseId: CourseId!
      bundleId: BundleId!
    ): Boolean!
  }

  type UnlockedCourse {
    courseId: CourseId!
    sections: [CourseSection!]!
  }

  type CourseSection {
    label: String!
    items: [CourseItem!]!
  }

  type CourseItem {
    kind: String!
    label: String!
    url: String!
    fileName: String
    secondaryUrl: String
  }
`;
