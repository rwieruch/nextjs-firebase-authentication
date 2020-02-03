import { MutationResolvers } from '@generated/gen-types';
import { getAsDiscount } from '@services/coupon';
import stripe from '@services/stripe';

import storefront from '../../../../content/course-storefront';

interface Resolvers {
  Mutation: MutationResolvers;
}

export const resolvers: Resolvers = {
  Mutation: {
    // https://stripe.com/docs/payments/checkout/one-time#create-one-time-payments
    stripeCreateOrder: async (
      parent,
      { imageUrl, courseId, bundleId, coupon },
      { me }
    ) => {
      const course = storefront[courseId];
      const bundle = course.bundles[bundleId];

      const price = await getAsDiscount(bundle.price, coupon);

      let session;

      try {
        session = await stripe.checkout.sessions.create({
          customer_email: me?.email,
          client_reference_id: me?.uid,
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
          },
          payment_intent_data: {
            description: `${courseId} ${bundleId}`,
          },
          success_url: process.env.BASE_URL,
          cancel_url: `${process.env.BASE_URL}/checkout?courseId=${courseId}&bundleId=${bundleId}&imageUrl=${imageUrl}`,
        });
      } catch (error) {
        throw new Error(error);
      }

      return { id: session.id };
    },
  },
};
