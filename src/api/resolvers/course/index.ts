import { QueryResolvers, MutationResolvers } from '@generated/server';
import {
  createCourse,
  // getCoursesById,
} from '@services/firebase/course';
import { mergeCourses } from '@services/course';

interface Resolvers {
  Query: QueryResolvers;
  Mutation: MutationResolvers;
}

export const resolvers: Resolvers = {
  Query: {
    unlockedCourses: async (_, __, { me, courseConnector }) => {
      if (!me) {
        return [];
      }

      // LEGACY
      // const courses = await getCoursesById(me?.uid);
      // if (!courses) {
      //   return [];
      // }

      const courses = await courseConnector.getCoursesByUserId(
        me.uid
      );

      const unlockedCourses = mergeCourses(courses);

      return Object.values(unlockedCourses).map(unlockedCourse => ({
        courseId: unlockedCourse.courseId,
        header: unlockedCourse.header,
        url: unlockedCourse.url,
        imageUrl: unlockedCourse.imageUrl,
        canUpgrade: unlockedCourse.canUpgrade,
      }));
    },
    unlockedCourse: async (
      _,
      { courseId },
      { me, courseConnector }
    ) => {
      if (!me) {
        return null;
      }

      // LEGACY
      // const courses = await getCoursesById(me?.uid);
      // if (!courses) {
      //   return null;
      // }

      const courses = await courseConnector.getCoursesByUserIdAndCourseId(
        me.uid,
        courseId
      );

      const unlockedCourses = mergeCourses(courses);

      const unlockedCourse = unlockedCourses.find(
        unlockedCourse => unlockedCourse.courseId === courseId
      );

      return unlockedCourse;
    },
  },
  Mutation: {
    createFreeCourse: async (
      _,
      { courseId, bundleId },
      { me, courseConnector }
    ) => {
      if (!me) {
        return false;
      }

      await courseConnector.createCourse({
        userId: me.uid,
        courseId: courseId,
        bundleId: bundleId,
        price: 0,
        currency: 'USD',
        paymentType: 'FREE',
        coupon: '',
      });

      // LEGACY
      await createCourse({
        uid: me?.uid,
        courseId,
        bundleId,
        amount: 0,
        paymentType: 'FREE',
        coupon: '',
      });
      // LEGACY END

      return true;
    },
    createAdminCourse: async (
      _,
      { uid, courseId, bundleId },
      { courseConnector }
    ) => {
      await courseConnector.createCourse({
        userId: uid,
        courseId: courseId,
        bundleId: bundleId,
        price: 0,
        currency: 'USD',
        paymentType: 'MANUAL',
        coupon: '',
      });

      // LEGACY
      await createCourse({
        uid,
        courseId,
        bundleId,
        amount: 0,
        paymentType: 'MANUAL',
        coupon: '',
      });
      // LEGACY END

      return true;
    },
  },
};
