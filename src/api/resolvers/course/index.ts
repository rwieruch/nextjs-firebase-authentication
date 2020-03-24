import { QueryResolvers, MutationResolvers } from '@generated/server';
import {
  createCourse,
  getCoursesById,
} from '@services/firebase/course';
import { Course } from '@models/course';
import { mergeCourses } from '@services/course';

interface Resolvers {
  Query: QueryResolvers;
  Mutation: MutationResolvers;
}

export const resolvers: Resolvers = {
  Query: {
    unlockedCourses: async (
      parent,
      args,
      { me, courseRepository }
    ) => {
      if (!me) {
        return [];
      }

      // LEGACY
      // const courses = await getCoursesById(me?.uid);
      // if (!courses) {
      //   return [];
      // }

      // NEW
      const courses = await courseRepository.find({
        where: { userId: me.uid },
      });

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
      parent,
      { courseId },
      { me, courseRepository }
    ) => {
      if (!me) {
        return null;
      }

      // LEGACY
      // const courses = await getCoursesById(me?.uid);
      // if (!courses) {
      //   return null;
      // }

      const courses = await courseRepository.find({
        where: { userId: me.uid, courseId },
      });

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
      { me, courseRepository }
    ) => {
      if (!me) {
        return false;
      }

      // NEW
      const course = new Course();
      course.userId = me.uid;
      course.courseId = courseId;
      course.bundleId = bundleId;
      course.price = 0;
      course.currency = 'USD';
      course.paymentType = 'FREE';
      course.coupon = '';
      await courseRepository.save(course);
      // NEW END

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
      parent,
      { uid, courseId, bundleId },
      { courseRepository }
    ) => {
      // NEW
      const course = new Course();
      course.userId = uid;
      course.courseId = courseId;
      course.bundleId = bundleId;
      course.price = 0;
      course.currency = 'USD';
      course.paymentType = 'MANUAL';
      course.coupon = '';
      await courseRepository.save(course);
      // NEW END

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
