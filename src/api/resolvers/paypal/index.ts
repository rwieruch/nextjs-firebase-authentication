import {
  ObjectType,
  Field,
  Arg,
  Ctx,
  Resolver,
  Mutation,
} from 'type-graphql';

import { COURSE } from '@data/course-keys-types';
import { BUNDLE } from '@data/bundle-keys-types';
import type { ResolverContext } from '@typeDefs/resolver';

// TODO https://github.com/paypal/Checkout-NodeJS-SDK/issues/25
import paypal from '@paypal/checkout-server-sdk';

import { priceWithDiscount } from '@services/discount';
import paypalClient from '@services/paypal';
import { createCourse } from '@services/firebase/course';

import storefront from '@data/course-storefront';

@ObjectType()
class PaypalOrderId {
  @Field({ nullable: true })
  orderId: string | undefined | null;
}

@Resolver()
export default class PaypalResolver {
  // https://developer.paypal.com/docs/checkout/reference/server-integration/set-up-transaction/
  @Mutation(() => PaypalOrderId)
  async paypalCreateOrder(
    @Arg('courseId') courseId: string,
    @Arg('bundleId') bundleId: string,

    @Arg('coupon', { nullable: true })
    coupon: string | undefined | null,

    @Arg('partnerId', { nullable: true })
    partnerId: string | undefined | null,

    @Ctx() ctx: ResolverContext
  ): Promise<PaypalOrderId> {
    const course = storefront[courseId as COURSE];
    const bundle = course.bundles[bundleId as BUNDLE];

    if (!ctx.me) {
      return { orderId: null };
    }

    const price = await priceWithDiscount(
      ctx.couponConnector,
      ctx.courseConnector
    )(
      courseId as COURSE,
      bundleId as BUNDLE,
      bundle.price,
      coupon,
      ctx.me?.uid
    );

    const request = new paypal.orders.OrdersCreateRequest();

    request.prefer('return=representation');

    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          reference_id: courseId,
          custom_id: JSON.stringify({
            courseId,
            bundleId,
            coupon,
            partnerId,
          }),
          description: `${courseId} ${bundleId}`,
          amount: {
            currency_code: 'USD',
            value: (price / 100).toFixed(2),
          },
        },
      ],
    });

    let order;
    try {
      order = await paypalClient().execute(request);
    } catch (error) {
      throw new Error(error);
    }

    return { orderId: order.result.id };
  }

  // https://developer.paypal.com/docs/checkout/reference/server-integration/capture-transaction/
  @Mutation(() => Boolean)
  async paypalApproveOrder(
    @Arg('orderId') orderId: string,
    @Ctx() ctx: ResolverContext
  ): Promise<boolean> {
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});

    try {
      const capture = await paypalClient().execute(request);

      const { amount, custom_id } =
        capture.result.purchase_units[0].payments.captures[0];

      const { courseId, bundleId, coupon, partnerId } =
        JSON.parse(custom_id);

      const course = await ctx.courseConnector.createCourse({
        userId: ctx.me!.uid,
        courseId: courseId,
        bundleId: bundleId,
        price: +amount.value.replace('.', ''),
        currency: 'USD',
        paymentType: 'PAYPAL',
        coupon: coupon,
      });

      if (coupon) {
        await ctx.couponConnector.removeCoupon(coupon);
      }

      if (partnerId && partnerId !== ctx.me?.uid) {
        await ctx.partnerConnector.createSale(course, partnerId);
      }

      // LEGACY
      await createCourse({
        uid: ctx.me?.uid,
        courseId,
        bundleId,
        amount: amount.value,
        paymentType: 'PAYPAL',
        coupon,
      });
      // LEGACY END
    } catch (error) {
      throw new Error(error);
    }

    return true;
  }
}
