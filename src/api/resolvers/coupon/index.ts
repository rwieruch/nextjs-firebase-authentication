import {
  ObjectType,
  Field,
  Arg,
  Ctx,
  Resolver,
  Query,
  Mutation,
} from 'type-graphql';

import { ResolverContext } from '@typeDefs/resolver';
import { priceWithDiscount } from '@services/discount';
import storefront from '@data/course-storefront';
import { COURSE } from '@data/course-keys-types';
import { BUNDLE } from '@data/bundle-keys-types';
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
  async discountedPrice(
    @Arg('courseId') courseId: string,
    @Arg('bundleId') bundleId: string,
    @Arg('coupon') coupon: string,
    @Ctx() ctx: ResolverContext
  ) {
    const course = storefront[courseId as COURSE];
    const bundle = course.bundles[bundleId as BUNDLE];

    if (!ctx.me) {
      return bundle.price;
    }

    const price = await priceWithDiscount(
      ctx.couponConnector,
      ctx.courseConnector
    )(
      courseId as COURSE,
      bundleId as BUNDLE,
      bundle.price,
      coupon,
      ctx.me.uid
    );

    return {
      price,
      isDiscount: price !== bundle.price,
    };
  }

  @Mutation(() => Boolean, { nullable: true })
  async couponCreate(
    @Arg('coupon') coupon: string,
    @Arg('discount') discount: number,
    @Arg('count') count: number,
    @Ctx() ctx: ResolverContext
  ) {
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
