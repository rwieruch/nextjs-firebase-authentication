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
      { me, courseRepository }
    ) => {
      const course = storefront[courseId];
      const bundle = course.bundles[bundleId];

      if (!me) {
        return bundle.price;
      }

      const courses = await courseRepository.find({
        where: { userId: me.uid, courseId },
      });

      const price = await getAsDiscount(
        courseId,
        bundleId,
        courses,
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
