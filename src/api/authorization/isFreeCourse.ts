import { rule } from 'graphql-shield';

import storefront from '@data/course-storefront';
import { COURSE } from '@data/course-keys';
import { BUNDLE } from '@data/bundle-keys';

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
