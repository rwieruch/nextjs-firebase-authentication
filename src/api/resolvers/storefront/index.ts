import { QueryResolvers } from '@generated/server';
import storefront from '../../../../content/course-storefront';

interface Resolvers {
  Query: QueryResolvers;
}

export const resolvers: Resolvers = {
  Query: {
    storefrontCourse: (parent, { courseId, bundleId }) => {
      const course = storefront[courseId];
      const bundle = course.bundles[bundleId];

      return {
        ...course,
        bundle,
      };
    },
    storefrontCourses: () => {
      return Object.values(storefront);
    },
  },
};
