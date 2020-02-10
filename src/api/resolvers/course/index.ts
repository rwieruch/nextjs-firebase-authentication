import { QueryResolvers, MutationResolvers } from '@generated/server';
import {
  createCourse,
  getCoursesById,
  FirebaseCourseContent,
  FirebaseCourse,
} from '@services/firebase/course';

import courseContent from '../../../../content/courses';

const mergeCourses = (courses: FirebaseCourse) =>
  Object.values(courses).reduce((result: any[], course) => {
    const isRole = (section: any) =>
      section.roles.includes(course.packageId);

    const sections = courseContent[course.courseId].sections.filter(
      isRole
    );

    const unlockedCourse = {
      courseId: course.courseId,
      sections,
    };

    const index = result.findIndex(
      prevCourse => prevCourse.courseId === course.courseId
    );

    const mergeIfSame = (prevCourse: any, i: number) => {
      if (i === index) {
        const duplicatedSections = prevCourse.sections.concat(
          unlockedCourse.sections
        );

        const sections = duplicatedSections.filter(
          (item: any, index: number) =>
            duplicatedSections.indexOf(item) === index
        );

        return {
          courseId: prevCourse.courseId,
          sections,
        };
      } else {
        return prevCourse;
      }
    };

    if (index > -1) {
      return result.map(mergeIfSame);
    } else {
      return result.concat(unlockedCourse);
    }
  }, []);

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

      return Object.values(unlockedCourses).map(course => ({
        courseId: course.courseId,
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
