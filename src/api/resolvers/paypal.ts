// TODO https://github.com/paypal/Checkout-NodeJS-SDK/issues/25
import paypal from '@paypal/checkout-server-sdk';

import { ResolverContext } from '@typeDefs/resolver';

import paypalClient from '@services/paypal';

import { COURSE } from '../../../content/course-keys';
import { BUNDLE } from '../../../content/course-keys';
import storefront from '../../../content/course-storefront';

export default {
  Mutation: {
    // https://developer.paypal.com/docs/checkout/reference/server-integration/set-up-transaction/
    paypalCreateOrder: async (
      parent: any,
      {
        courseId,
        bundleId,
        coupon,
      }: { courseId: COURSE; bundleId: BUNDLE; coupon: string },
      { me }: ResolverContext
    ) => {
      const course = storefront[courseId];
      const bundle = course.bundles[bundleId];

      const request = new paypal.orders.OrdersCreateRequest();

      request.prefer('return=representation');

      // TODO apply discount if coupon

      request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: (bundle.price / 100).toFixed(2),
            },
          },
        ],
      });

      let order;
      try {
        order = await paypalClient().execute(request);
      } catch (error) {
        throw new Error(error.message);
      }

      return { orderId: order.result.id };
    },
    // https://developer.paypal.com/docs/checkout/reference/server-integration/capture-transaction/
    paypalApproveOrder: async (
      parent: any,
      {
        courseId,
        bundleId,
        orderId,
      }: { courseId: COURSE; bundleId: BUNDLE; orderId: string },
      { me }: ResolverContext
    ) => {
      const course = storefront[courseId];
      const bundle = course.bundles[bundleId];

      const request = new paypal.orders.OrdersCaptureRequest(orderId);
      request.requestBody({});

      try {
        const capture = await paypalClient().execute(request);

        // 4. Save the capture ID to your database. Implement logic to save capture to your database for future reference.
        const captureId =
          capture.result.purchase_units[0].payments.captures[0].id;
        // await database.saveCaptureId(captureId);
      } catch (error) {
        throw new Error(error.message);
      }

      return true;
    },
  },
};
