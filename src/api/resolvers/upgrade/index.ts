import { QueryResolvers } from '@generated/server';
// import { getCoursesById } from '@services/firebase/course';
import { getUpgradeableCourses } from '@services/course';

interface Resolvers {
  Query: QueryResolvers;
}

export const resolvers: Resolvers = {
  Query: {
    upgradeableCourses: async (
      _,
      { courseId },
      { me, courseConnector }
    ) => {
      if (!me) {
        return [];
      }

      const courses = await courseConnector.getCoursesByUserIdAndCourseId(
        me.uid,
        courseId
      );

      // LEGACY
      // const courses = await getCoursesById(me?.uid);
      // if (!courses) {
      //   return [];
      // }

      return getUpgradeableCourses(courseId, courses);
    },
  },
};
