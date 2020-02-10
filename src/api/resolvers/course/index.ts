import { QueryResolvers, MutationResolvers } from '@generated/server';
import {
  createCourse,
  getCoursesById,
  FirebaseCourseContent,
  FirebaseCourse,
} from '@services/firebase/course';

import courseContent from '../../../../content/courses';

interface Resolvers {
  Query: QueryResolvers;
  Mutation: MutationResolvers;
}

export const resolvers: Resolvers = {
  Query: {
    unlockedCourses: async (parent, args, { me }) => {
      const courses = await getCoursesById(me?.uid);

      if (!courses) {
        return [];
      }

      const unlockedCourses = Object.values(courses).reduce(
        (result: any[], course) => {
          const isRole = (section: any) =>
            section.roles.includes(course.packageId);

          const sections = courseContent[
            course.courseId
          ].sections.filter(isRole);

          const unlockedCourse = {
            courseId: course.courseId,
            sections,
          };

          const index = result.findIndex(
            prevCourse => prevCourse.courseId === course.courseId
          );

          const mergeIfSame = (prevCourse: any, i: number) => {
            if (i === index) {
              return { ...prevCourse, ...unlockedCourse };
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

      console.log(unlockedCourses);

      return unlockedCourses;
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
