import { rule } from 'graphql-shield';

import storefront from '../../../content/course-storefront';
import { COURSE } from '../../../content/course-keys';
import { BUNDLE } from '../../../content/course-keys';

export const isFreeCourse = rule()(
  async (
    parent,
    { courseId, bundleId }: { courseId: COURSE; bundleId: BUNDLE }
  ) => {
    const course = storefront[courseId];
    const bundle = course.bundles[bundleId];

    return bundle.price === 0
      ? true
      : new Error('This course is not for free.');
  }
);
