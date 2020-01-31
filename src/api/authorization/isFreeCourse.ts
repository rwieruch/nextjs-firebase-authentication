import { COURSE } from '../../../content/course-keys';
import { BUNDLE } from '../../../content/course-keys';
import storefront from '../../../content/course-storefront';

import { skip } from 'graphql-resolvers';

export const isFreeCourse = (
  _: any,
  { courseId, bundleId }: { courseId: COURSE; bundleId: BUNDLE }
) => {
  const course = storefront[courseId];
  const bundle = course.bundles[bundleId];

  return bundle.price === 0
    ? skip
    : new Error('This course is not for free.');
};
