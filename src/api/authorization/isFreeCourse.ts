import { rule } from 'graphql-shield';

import storefront from '@data/course-storefront';
import { COURSE } from '@data/course-keys-types';
import { BUNDLE } from '@data/bundle-keys-types';

export const isFreeCourse = rule()(
  async (
    _,
    { courseId, bundleId }: { courseId: COURSE; bundleId: BUNDLE }
  ) => {
    const course = storefront[courseId];
    const bundle = course.bundles[bundleId];

    return bundle.price === 0
      ? true
      : new Error('This course is not for free.');
  }
);
