// TODO https://github.com/paypal/Checkout-NodeJS-SDK/issues/25
import paypal from '@paypal/checkout-server-sdk';

import { MutationResolvers } from '@generated/server';
import { getAsDiscount } from '@services/coupon';
import paypalClient from '@services/paypal';
import { createCourse } from '@services/firebase/course';

import storefront from '@data/course-storefront';

interface Resolvers {
  Mutation: MutationResolvers;
}

export const resolvers: Resolvers = {
  Mutation: {
    // https://developer.paypal.com/docs/checkout/reference/server-integration/set-up-transaction/
    paypalCreateOrder: async (
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

      const request = new paypal.orders.OrdersCreateRequest();

      request.prefer('return=representation');

      request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [
          {
            reference_id: courseId,
            custom_id: JSON.stringify({ courseId, bundleId }),
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
        throw new Error(error.message);
      }

      return { orderId: order.result.id };
    },
    // https://developer.paypal.com/docs/checkout/reference/server-integration/capture-transaction/
    paypalApproveOrder: async (parent, { orderId }, { me }) => {
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
          uid: me?.uid,
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
