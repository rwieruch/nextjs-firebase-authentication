import { QueryResolvers, MutationResolvers } from '@generated/server';
import {
  createCourse,
  getCoursesById,
} from '@services/firebase/course';
import { mergeCourses } from '@services/course';

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
        coupon: '',
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
        coupon: '',
      });

      return true;
    },
  },
};
