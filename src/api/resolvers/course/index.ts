import { QueryResolvers, MutationResolvers } from '@generated/server';
import {
  createCourse,
  getCoursesById,
  FirebaseCourseContent,
  FirebaseCourse,
} from '@services/firebase/course';

import courseContent from '@data/courses';
import storefront from '@data/course-storefront';

const mergeCourses = (courses: FirebaseCourse) =>
  Object.values(courses).reduce(
    (result: any[], course: FirebaseCourseContent) => {
      const storefrontCourse = storefront[course.courseId];
      const bundle = storefrontCourse.bundles[course.packageId];

      const allowedSections = courseContent[
        course.courseId
      ].sections.filter(section =>
        section.roles.includes(course.packageId)
      );

      const unlockedCourse = {
        courseId: course.courseId,
        bundleId: course.packageId,
        header: storefrontCourse.header,
        url: storefrontCourse.url,
        imageUrl: bundle.imageUrl,
        weight: bundle.weight,
        sections: allowedSections,
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

          const duplicatedSections = prevCourse.sections.concat(
            unlockedCourse.sections
          );

          const sections = duplicatedSections.filter(
            (item: any, index: number) =>
              duplicatedSections.indexOf(item) === index
          );

          const mergedCourse = {
            courseId,
            bundleId,
            header,
            url,
            imageUrl,
            sections,
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
