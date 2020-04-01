import { QueryResolvers, MutationResolvers } from '@generated/server';
import { priceWithDiscount } from '@services/discount';
import storefront from '@data/course-storefront';

interface Resolvers {
  Query: QueryResolvers;
  Mutation: MutationResolvers;
}

export const resolvers: Resolvers = {
  Query: {
    discountedPrice: async (
      _,
      { courseId, bundleId, coupon },
      { me, courseConnector, couponConnector }
    ) => {
      const course = storefront[courseId];
      const bundle = course.bundles[bundleId];

      if (!me) {
        return bundle.price;
      }

      const price = await priceWithDiscount(
        couponConnector,
        courseConnector
      )(courseId, bundleId, bundle.price, coupon, me.uid);

      return {
        price,
        isDiscount: price !== bundle.price,
      };
    },
  },
  Mutation: {
    couponCreate: async (
      _,
      { coupon, discount, count },
      { couponConnector }
    ) => {
      try {
        await couponConnector.createCoupons(coupon, discount, count);
      } catch (error) {
        return false;
      }

      return true;
    },
  },
};
