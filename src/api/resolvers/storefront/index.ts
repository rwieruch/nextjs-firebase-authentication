import sortBy from 'lodash.sortby';

import { QueryResolvers } from '@generated/server';

import storefront from '@data/course-storefront';

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
    storefrontBundles: (parent, { courseId }) => {
      const course = storefront[courseId];

      return sortBy(
        Object.values(course.bundles),
        (bundle: any) => bundle.weight
      );
    },
  },
};
