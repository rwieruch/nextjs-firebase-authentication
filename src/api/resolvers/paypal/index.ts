// TODO https://github.com/paypal/Checkout-NodeJS-SDK/issues/25
import paypal from '@paypal/checkout-server-sdk';

import { MutationResolvers } from '@generated/server';
import { getAsDiscount } from '@services/coupon';
import paypalClient from '@services/paypal';
import { Course } from '@models/course';
import { PartnerSale } from '@models/partner';
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
      { courseId, bundleId, coupon, partnerId },
      { me, courseRepository }
    ) => {
      const course = storefront[courseId];
      const bundle = course.bundles[bundleId];

      if (!me) {
        return { orderId: null };
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
        throw new Error(error.message);
      }

      return { orderId: order.result.id };
    },
    // https://developer.paypal.com/docs/checkout/reference/server-integration/capture-transaction/
    paypalApproveOrder: async (
      parent,
      { orderId },
      { me, courseRepository, partnerSaleRepository }
    ) => {
      const request = new paypal.orders.OrdersCaptureRequest(orderId);
      request.requestBody({});

      try {
        const capture = await paypalClient().execute(request);

        const {
          amount,
          custom_id,
        } = capture.result.purchase_units[0].payments.captures[0];

        const { courseId, bundleId, coupon, partnerId } = JSON.parse(
          custom_id
        );

        // NEW
        const course = new Course();
        course.userId = me!.uid;
        course.courseId = courseId;
        course.bundleId = bundleId;
        course.price = +amount.value.replace('.', '');
        course.currency = 'USD';
        course.paymentType = 'PAYPAL';
        course.coupon = coupon;
        const { id } = await courseRepository.save(course);
        // NEW END

        // TODO belongs in partner DAO
        if (partnerId) {
          const partnerSale = new PartnerSale();
          partnerSale.saleId = id;
          partnerSale.partnerId = partnerId;
          await partnerSaleRepository.save(partnerSale);
        }

        // LEGACY
        await createCourse({
          uid: me?.uid,
          courseId,
          bundleId,
          amount: amount.value,
          paymentType: 'PAYPAL',
          coupon,
        });
        // LEGACY END
      } catch (error) {
        throw new Error(error.message);
      }

      return true;
    },
  },
};
