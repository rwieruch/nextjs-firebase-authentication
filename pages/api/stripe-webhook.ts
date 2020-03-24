// https://stripe.com/docs/payments/checkout/fulfillment#webhooks

import stripe from '@services/stripe';

// LEGACY
import { createCourse } from '@services/firebase/course';
// LEGACY END

import getConnection from '@models/index';
import { Course } from '@models/course';

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

    // NEW
    const connection = await getConnection();

    const courseRepository = connection!.getRepository(Course);
    const course = new Course();
    course.userId = client_reference_id;
    course.courseId = metadata.courseId;
    course.bundleId = metadata.bundleId;
    course.price = display_items[0].amount;
    course.currency = 'USD';
    course.paymentType = 'STRIPE';
    course.coupon = metadata.coupon;
    await courseRepository.save(course);
    // NEW END

    // LEGACY
    await createCourse({
      uid: client_reference_id,
      courseId: metadata.courseId,
      bundleId: metadata.bundleId,
      amount: Number((display_items[0].amount / 100).toFixed(2)),
      paymentType: 'STRIPE',
      coupon: metadata.coupon,
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
