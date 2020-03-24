import { QueryResolvers } from '@generated/server';
import { getCoursesById } from '@services/firebase/course';
import { getUpgradeableCourses } from '@services/course';

interface Resolvers {
  Query: QueryResolvers;
}

export const resolvers: Resolvers = {
  Query: {
    upgradeableCourses: async (
      parent,
      { courseId },
      { me, courseRepository }
    ) => {
      if (!me) {
        return [];
      }

      const courses = await courseRepository.find({
        where: { userId: me.uid, courseId },
      });

      // LEGACY
      // const courses = await getCoursesById(me?.uid);
      // if (!courses) {
      //   return [];
      // }

      return getUpgradeableCourses(courseId, courses);
    },
  },
};
