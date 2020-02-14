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
    canUpgrade: Boolean!
  }

  type UnlockedCourse {
    courseId: CourseId!
    bundleId: BundleId!
    header: String!
    url: String!
    imageUrl: String!
    canUpgrade: Boolean!
    introduction: Introduction
    onboarding: Onboarding
    bookDownload: BookDownload
    bookOnline: BookOnline
    curriculum: Curriculum
  }

  type Introduction {
    label: String!
    data: IntroductionData
  }

  type IntroductionData {
    label: String!
    url: String!
    description: String!
  }

  type Onboarding {
    label: String!
    data: OnboardingData
  }

  type OnboardingData {
    label: String!
    url: String!
    description: String!
  }

  type BookDownload {
    label: String!
    data: BookDownloadData
  }

  type BookDownloadData {
    label: String!
    items: [BookDownloadItem!]!
  }

  type BookDownloadItem {
    label: String!
    description: String!
    url: String!
    fileName: String!
  }

  type BookOnline {
    label: String!
    data: BookOnlineData
  }

  type BookOnlineData {
    chapters: [BookChapter!]!
  }

  type BookChapter {
    label: String!
    url: String
    sections: [BookSection!]
  }

  type BookSection {
    label: String!
    url: String!
  }

  type Curriculum {
    label: String!
    data: CurriculumData
  }

  type CurriculumData {
    sections: [CurriculumSection!]!
  }

  type CurriculumSection {
    label: String!
    items: [CurriculumItem!]!
  }

  type CurriculumItem {
    label: String!
    url: String!
    description: String!
    kind: Kind!
    secondaryUrl: String
  }

  enum Kind {
    Article
    Video
  }
`;
