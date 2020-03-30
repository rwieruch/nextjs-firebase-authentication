// https://stripe.com/docs/payments/checkout/fulfillment#webhooks

import stripe from '@services/stripe';

// LEGACY
import { createCourse } from '@services/firebase/course';
// LEGACY END

import getConnection from '@models/index';
import { CourseConnector } from '@connectors/course';
import { PartnerConnector } from '@connectors/partner';

import { send } from 'micro';
import getRawBody from 'raw-body';

import { ServerRequest, ServerResponse } from '@typeDefs/server';

export default async (
  request: ServerRequest,
  response: ServerResponse
) => {
  const rawBody = await getRawBody(request);

  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    send(response, 400, `Webhook Error: ${error.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    const {
      metadata,
      client_reference_id,
      // customer_email,
      display_items,
    } = session;

    const { courseId, bundleId, coupon, partnerId } = metadata;

    const connection = await getConnection();
    const courseConnector = new CourseConnector(connection!);
    const partnerConnector = new PartnerConnector(connection!);

    const course = await courseConnector.createCourse({
      userId: client_reference_id,
      courseId: courseId,
      bundleId: bundleId,
      price: display_items[0].amount,
      currency: 'USD',
      paymentType: 'STRIPE',
      coupon: coupon,
    });

    if (partnerId) {
      await partnerConnector.createSale(course, partnerId);
    }

    // LEGACY
    await createCourse({
      uid: client_reference_id,
      courseId: courseId,
      bundleId: bundleId,
      amount: Number((display_items[0].amount / 100).toFixed(2)),
      paymentType: 'STRIPE',
      coupon: coupon,
    });
    // LEGACY END
  }

  // TODO
  // accoring to Stripe documentation a response from express looks like: response.json({ received: true });
  // I send the response with Micro now and experience that the Stripe server doesn't react to it. Is there anything wrong?
  send(response, 200, { received: true });
};

export const config = {
  api: {
    bodyParser: false,
  },
};
