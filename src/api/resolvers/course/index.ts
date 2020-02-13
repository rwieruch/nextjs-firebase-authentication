import { QueryResolvers, MutationResolvers } from '@generated/server';
import {
  createCourse,
  getCoursesById,
  FirebaseCourseContent,
  FirebaseCourse,
} from '@services/firebase/course';

import allCourseContent from '@data/courses';
import storefront from '@data/course-storefront';

const mergeCourses = (courses: FirebaseCourse) =>
  Object.values(courses).reduce(
    (result: any[], course: FirebaseCourseContent) => {
      const storefrontCourse = storefront[course.courseId];
      const bundle = storefrontCourse.bundles[course.packageId];

      const {
        introduction,
        onboarding,
        bookDownload,
        bookOnline,
        course: sections,
      } = allCourseContent[course.courseId];

      const hasIntroduction = introduction.roles.includes(
        bundle.bundleId
      );
      const allowedIntroduction = hasIntroduction
        ? introduction
        : null;

      const hasOnboarding = onboarding.roles.includes(
        bundle.bundleId
      );
      const allowedOnboarding = hasOnboarding ? onboarding : null;

      const hasBookDownload = bookDownload.roles.includes(
        bundle.bundleId
      );
      const allowedBookDownload = hasBookDownload
        ? bookDownload
        : null;

      const hasBookOnline = bookOnline.roles.includes(
        bundle.bundleId
      );
      const allowedBookOnline = hasBookOnline ? bookOnline : null;

      const allowedCourseSections = sections.filter(section =>
        section.roles.includes(bundle.bundleId)
      );

      const unlockedCourse = {
        courseId: course.courseId,
        bundleId: course.packageId,
        header: storefrontCourse.header,
        url: storefrontCourse.url,
        imageUrl: bundle.imageUrl,
        weight: bundle.weight,
        introduction: allowedIntroduction,
        onboarding: allowedOnboarding,
        bookDownload: allowedBookDownload,
        bookOnline: allowedBookOnline,
        courseSections: allowedCourseSections,
      };

      const index = result.findIndex(
        prevCourse => prevCourse.courseId === course.courseId
      );

      const mergeIfSame = (prevCourse: any, i: number) => {
        if (i === index) {
          const { courseId, header, url } = prevCourse;

          const moreWeight =
            prevCourse.weight >= unlockedCourse.weight;

          const imageUrl = moreWeight
            ? prevCourse.imageUrl
            : unlockedCourse.imageUrl;

          const bundleId = moreWeight
            ? prevCourse.bundleId
            : unlockedCourse.bundleId;

          const introduction = {
            ...prevCourse.introduction,
            ...unlockedCourse.introduction,
          };

          const onboarding = {
            ...prevCourse.onboarding,
            ...unlockedCourse.onboarding,
          };

          const bookDownload = {
            ...prevCourse.bookDownload,
            ...unlockedCourse.bookDownload,
          };

          const bookOnline = {
            ...prevCourse.bookOnline,
            ...unlockedCourse.bookOnline,
          };

          const duplicatedSections = prevCourse.courseSections.concat(
            unlockedCourse.courseSections
          );

          const courseSections = duplicatedSections.filter(
            (item: any, index: number) =>
              duplicatedSections.indexOf(item) === index
          );

          const mergedCourse = {
            courseId,
            bundleId,
            header,
            url,
            imageUrl,
            introduction,
            onboarding,
            bookDownload,
            bookOnline,
            courseSections,
          };

          return mergedCourse;
        } else {
          return prevCourse;
        }
      };

      if (index > -1) {
        return result.map(mergeIfSame);
      } else {
        return result.concat(unlockedCourse);
      }
    },
    []
  );

interface Resolvers {
  Query: QueryResolvers;
  Mutation: MutationResolvers;
}

export const resolvers: Resolvers = {
  Query: {
    unlockedCourses: async (parent, args, { me }) => {
      if (!me) {
        return [];
      }

      const courses = await getCoursesById(me?.uid);

      if (!courses) {
        return [];
      }

      const unlockedCourses = mergeCourses(courses);

      return Object.values(unlockedCourses).map(unlockedCourse => ({
        courseId: unlockedCourse.courseId,
        header: unlockedCourse.header,
        url: unlockedCourse.url,
        imageUrl: unlockedCourse.imageUrl,
      }));
    },
    unlockedCourse: async (parent, { courseId }, { me }) => {
      if (!me) {
        return null;
      }

      const courses = await getCoursesById(me?.uid);

      if (!courses) {
        return null;
      }

      const unlockedCourses = mergeCourses(courses);

      const unlockedCourse = unlockedCourses.find(
        unlockedCourse => unlockedCourse.courseId === courseId
      );

      return unlockedCourse;
    },
  },
  Mutation: {
    createFreeCourse: async (
      parent,
      { courseId, bundleId },
      { me }
    ) => {
      await createCourse({
        uid: me?.uid,
        courseId,
        bundleId,
        amount: 0,
        paymentType: 'FREE',
      });

      return true;
    },
    createAdminCourse: async (
      parent,
      { uid, courseId, bundleId }
    ) => {
      await createCourse({
        uid,
        courseId,
        bundleId,
        amount: 0,
        paymentType: 'MANUAL',
      });

      return true;
    },
  },
};
