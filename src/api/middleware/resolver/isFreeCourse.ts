import { MiddlewareFn } from 'type-graphql';

import type { ResolverContext } from '@typeDefs/resolver';
import storefront from '@data/course-storefront';
import { COURSE } from '@data/course-keys-types';
import { BUNDLE } from '@data/bundle-keys-types';
import { priceWithDiscount } from '@services/discount';

export const isFreeCourse: MiddlewareFn<ResolverContext> = async (
  { args, context },
  next
) => {
  const course = storefront[args.courseId as COURSE];
  const bundle = course.bundles[args.bundleId as BUNDLE];

  const price = await priceWithDiscount(
    context.couponConnector,
    context.courseConnector
  )(
    args.courseId as COURSE,
    args.bundleId as BUNDLE,
    bundle.price,
    args.coupon,
    context.me?.uid
  );

  if (price !== 0) {
    throw new Error('This course is not for free.');
  }

  return next();
};
