import { gql } from 'apollo-server-micro';

export default gql`
  extend type Query {
    unlockedCourses: [UnlockedCourseMeta!]!

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

  type UnlockedCourseMeta {
    courseId: CourseId!
    header: String!
    url: String!
    imageUrl: String!
  }

  type UnlockedCourse {
    courseId: CourseId!
    bundleId: BundleId!
    header: String!
    url: String!
    imageUrl: String!
    introduction: UnlockedCourseSection
    onboarding: UnlockedCourseSection
    bookDownload: UnlockedCourseSection
    bookOnline: UnlockedCourseSection
    courseSections: [UnlockedCourseSection!]
  }

  type UnlockedCourseSection {
    label: String!
    items: [UnlockedCourseItem!]!
  }

  type UnlockedCourseItem {
    kind: Kind!
    label: String!
    description: String
    url: String!
    fileName: String
    secondaryUrl: String
  }

  enum Kind {
    Introduction
    Onboarding
    BookDownload
    BookOnline
    Article
    Video
  }
`;
