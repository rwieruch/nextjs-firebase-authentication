import omit from 'lodash.omit';

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
        curriculum,
      } = allCourseContent[course.courseId];

      const hasIntroduction = introduction.roles
        ? introduction.roles.includes(bundle.bundleId)
        : true;
      const allowedIntroduction = hasIntroduction
        ? introduction
        : omit(introduction, 'data');

      const hasOnboarding = onboarding.roles
        ? onboarding.roles.includes(bundle.bundleId)
        : true;
      const allowedOnboarding = hasOnboarding
        ? onboarding
        : omit(onboarding, 'data');

      const hasBookDownload = bookDownload.roles
        ? bookDownload.roles.includes(bundle.bundleId)
        : true;
      const allowedBookDownload = hasBookDownload
        ? bookDownload
        : omit(bookDownload, 'data');

      const hasBookOnline = bookOnline.roles
        ? bookOnline.roles.includes(bundle.bundleId)
        : true;
      const allowedBookOnline = hasBookOnline
        ? bookOnline
        : omit(bookOnline, 'data');

      const hasCurriculum = curriculum.roles
        ? curriculum.roles.includes(bundle.bundleId)
        : true;
      const allowedCurriculum = hasCurriculum
        ? curriculum
        : omit(curriculum, 'data');

      const canUpgrade =
        !hasIntroduction ||
        !hasOnboarding ||
        !hasBookDownload ||
        !hasBookOnline ||
        !hasCurriculum;

      const unlockedCourse = {
        courseId: course.courseId,
        bundleId: course.packageId,

        header: storefrontCourse.header,
        url: storefrontCourse.url,
        imageUrl: bundle.imageUrl,

        weight: bundle.weight,
        canUpgrade,

        introduction: allowedIntroduction,
        onboarding: allowedOnboarding,
        bookDownload: allowedBookDownload,
        bookOnline: allowedBookOnline,
        curriculum: allowedCurriculum,
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

          const canUpgrade =
            prevCourse.canUpgrade && unlockedCourse.canUpgrade;

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

          const curriculum = {
            ...prevCourse.curriculum,
            ...unlockedCourse.curriculum,
          };

          const mergedCourse = {
            courseId,
            bundleId,
            header,
            url,
            imageUrl,
            canUpgrade,
            introduction,
            onboarding,
            bookDownload,
            bookOnline,
            curriculum,
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
        canUpgrade: unlockedCourse.canUpgrade,
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
