import { gql } from 'apollo-server-micro';

export default gql`
  extend type Query {
    unlockedCourses: [UnlockedCourse!]!

    unlockedCourse(courseId: CourseId!): UnlockedCourse
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
    sections: [UnlockedCourseSection!]!
  }

  type UnlockedCourseSection {
    label: String!
    items: [UnlockedCourseItem!]!
  }

  type UnlockedCourseItem {
    kind: String!
    label: String!
    url: String!
    fileName: String
    secondaryUrl: String
  }
`;
