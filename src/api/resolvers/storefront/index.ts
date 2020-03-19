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
        header: course.header,
        courseId: course.courseId,
        url: course.url,
        imageUrl: course.imageUrl,
        canUpgrade: false,
        bundle,
      };
    },
    storefrontCourses: () => {
      return Object.values(storefront).map(storefrontCourse => ({
        courseId: storefrontCourse.courseId,
        header: storefrontCourse.header,
        url: storefrontCourse.url,
        imageUrl: storefrontCourse.imageUrl,
        canUpgrade: false,
      }));
    },
  },
};
