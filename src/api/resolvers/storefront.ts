import { COURSE } from '../../../content/course-keys';
import { BUNDLE } from '../../../content/course-keys';
import storefront from '../../../content/course-storefront';

export default {
  Query: {
    getStorefront: (
      parent: any,
      { courseId, bundleId }: { courseId: COURSE; bundleId: BUNDLE }
    ) => {
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
