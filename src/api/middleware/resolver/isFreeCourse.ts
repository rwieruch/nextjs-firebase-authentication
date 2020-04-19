import { MiddlewareFn } from 'type-graphql';

import { ResolverContext } from '@typeDefs/resolver';
import storefront from '@data/course-storefront';
import { COURSE } from '@data/course-keys-types';
import { BUNDLE } from '@data/bundle-keys-types';

export const isFreeCourse: MiddlewareFn<ResolverContext> = async (
  { args },
  next
) => {
  const course = storefront[args.courseId as COURSE];
  const bundle = course.bundles[args.bundleId as BUNDLE];

  if (bundle.price !== 0) {
    throw new Error('This course is not for free.');
  }

  return next();
};
