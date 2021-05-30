import {
  ObjectType,
  Field,
  Arg,
  Ctx,
  Resolver,
  Mutation,
  UseMiddleware,
} from 'type-graphql';

import { COURSE } from '@data/course-keys-types';
import { BUNDLE } from '@data/bundle-keys-types';
import type { ResolverContext } from '@typeDefs/resolver';

@ObjectType()
class StripeId {
  @Field({ nullable: true })
  id: string | undefined | null;
}

import { priceWithDiscount } from '@services/discount';
import stripe from '@services/stripe';

import storefront from '@data/course-storefront';
import { isAuthenticated } from '@api/middleware/resolver/isAuthenticated';

// https://stripe.com/docs/payments/checkout/one-time#create-one-time-payments
@Resolver()
export default class StripeResolver {
  @Mutation(() => StripeId)
  async stripeCreateOrder(
    @Arg('imageUrl') imageUrl: string,
    @Arg('courseId') courseId: string,
    @Arg('bundleId') bundleId: string,

    @Arg('coupon', { nullable: true })
    coupon: string | undefined | null,

    @Arg('partnerId', { nullable: true })
    partnerId: string | undefined | null,

    @Ctx() ctx: ResolverContext
  ): Promise<StripeId> {
    const course = storefront[courseId as COURSE];
    const bundle = course.bundles[bundleId as BUNDLE];

    if (!ctx.me) {
      return { id: null };
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

    let session;

    try {
      session = await stripe.checkout.sessions.create({
        customer_email: ctx.me?.email,
        client_reference_id: ctx.me?.uid,
        payment_method_types: ['card'],
        line_items: [
          {
            name: course.header,
            description: bundle.header,
            images: [imageUrl],
            amount: price,
            currency: 'usd',
            quantity: 1,
          },
        ],
        metadata: {
          courseId,
          bundleId,
          coupon,
          partnerId,
        },
        payment_intent_data: {
          description: `${courseId} ${bundleId}`,
        },
        success_url: process.env.BASE_URL,
        cancel_url: `${process.env.BASE_URL}/checkout?courseId=${courseId}&bundleId=${bundleId}`,
      });
    } catch (error) {
      throw new Error(error);
    }

    return { id: session.id };
  }
}
