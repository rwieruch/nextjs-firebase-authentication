import { QueryResolvers } from '@generated/server';
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

      return getUpgradeableCourses(courseId, courses);
    },
  },
};
