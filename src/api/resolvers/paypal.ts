// TODO https://github.com/paypal/Checkout-NodeJS-SDK/issues/25
import paypal from '@paypal/checkout-server-sdk';

import { ResolverContext } from '@typeDefs/resolver';

import { getAsDiscount } from '@services/coupon';
import paypalClient from '@services/paypal';
import { createCourse } from '@services/firebase/course';

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
      }: { courseId: COURSE; bundleId: BUNDLE; coupon?: string },
      { me }: ResolverContext
    ) => {
      const course = storefront[courseId];
      const bundle = course.bundles[bundleId];

      const price = await getAsDiscount(bundle.price, coupon);

      const request = new paypal.orders.OrdersCreateRequest();

      request.prefer('return=representation');

      request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [
          {
            reference_id: courseId,
            custom_id: JSON.stringify({ courseId, bundleId }),
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
        throw new Error(error.message);
      }

      return { orderId: order.result.id };
    },
    // https://developer.paypal.com/docs/checkout/reference/server-integration/capture-transaction/
    paypalApproveOrder: async (
      parent: any,
      { orderId }: { orderId: string },
      { me }: ResolverContext
    ) => {
      const request = new paypal.orders.OrdersCaptureRequest(orderId);
      request.requestBody({});

      try {
        const capture = await paypalClient().execute(request);

        const {
          amount,
          custom_id,
        } = capture.result.purchase_units[0].payments.captures[0];

        const { courseId, bundleId } = JSON.parse(custom_id);

        await createCourse({
          uid: me.uid,
          courseId,
          bundleId,
          amount: amount.value,
          paymentType: 'PAYPAL',
        });
      } catch (error) {
        throw new Error(error.message);
      }

      return true;
    },
  },
};
