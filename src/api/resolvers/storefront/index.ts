import { QueryResolvers } from '@generated/gen-types';
import storefront from '../../../../content/course-storefront';

interface Resolvers {
  Query: QueryResolvers;
}

export const resolvers: Resolvers = {
  Query: {
    storefront: (parent, { courseId, bundleId }) => {
      if (!courseId || !bundleId) {
        return null;
      }

      const course = storefront[courseId];
      const bundle = course.bundles[bundleId];

      if (!course || !bundle) {
        return null;
      }

      return {
        course: {
          ...course,
          bundle,
        },
      };
    },
  },
};
