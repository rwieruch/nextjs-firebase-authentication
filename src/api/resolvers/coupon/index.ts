import { QueryResolvers } from '@generated/server';
import { getAsDiscount } from '@services/coupon';
import storefront from '@data/course-storefront';

interface Resolvers {
  Query: QueryResolvers;
}

export const resolvers: Resolvers = {
  Query: {
    discountedPrice: async (
      _,
      { courseId, bundleId, coupon },
      { me, courseConnector }
    ) => {
      const course = storefront[courseId];
      const bundle = course.bundles[bundleId];

      if (!me) {
        return bundle.price;
      }

      const courses = await courseConnector.getCoursesByUserIdAndCourseId(
        me.uid,
        courseId
      );

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
