import { QueryResolvers } from '@generated/server';
import { getAsDiscount } from '@services/coupon';
import storefront from '@data/course-storefront';

interface Resolvers {
  Query: QueryResolvers;
}

export const resolvers: Resolvers = {
  Query: {
    discountedPrice: async (
      parent,
      { courseId, bundleId, coupon },
      { me }
    ) => {
      const course = storefront[courseId];
      const bundle = course.bundles[bundleId];

      const price = await getAsDiscount(
        courseId,
        bundleId,
        bundle.price,
        coupon,
        me?.uid
      );

      return {
        price,
        isDiscount: price !== bundle.price,
      };
    },
  },
};
