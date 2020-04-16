import {
  ObjectType,
  Field,
  Arg,
  Ctx,
  Resolver,
  Query,
  Mutation,
  UseMiddleware,
} from 'type-graphql';

import { ResolverContext } from '@typeDefs/resolver';
import { priceWithDiscount } from '@services/discount';
import storefront from '@data/course-storefront';
import { COURSE } from '@data/course-keys-types';
import { BUNDLE } from '@data/bundle-keys-types';
import { isAuthenticated } from '@api/middleware/resolver/isAuthenticated';
import { isAdmin } from '@api/middleware/resolver/isAdmin';
@ObjectType()
class Discount {
  @Field()
  price: number;

  @Field()
  isDiscount: boolean;
}

@Resolver()
export default class CouponResolver {
  @Query(() => Discount)
  @UseMiddleware(isAuthenticated)
  async discountedPrice(
    @Arg('courseId') courseId: string,
    @Arg('bundleId') bundleId: string,
    @Arg('coupon') coupon: string,
    @Ctx() ctx: ResolverContext
  ): Promise<Discount> {
    const course = storefront[courseId as COURSE];
    const bundle = course.bundles[bundleId as BUNDLE];

    const price = await priceWithDiscount(
      ctx.couponConnector,
      ctx.courseConnector
    )(
      courseId as COURSE,
      bundleId as BUNDLE,
      bundle.price,
      coupon,
      ctx.me!.uid
    );

    return {
      price,
      isDiscount: price !== bundle.price,
    };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthenticated, isAdmin)
  async couponCreate(
    @Arg('coupon') coupon: string,
    @Arg('discount') discount: number,
    @Arg('count') count: number,
    @Ctx() ctx: ResolverContext
  ): Promise<Boolean> {
    try {
      await ctx.couponConnector.createCoupons(
        coupon,
        discount,
        count
      );
    } catch (error) {
      throw new Error(error);
    }

    return true;
  }
}
