// https://stripe.com/docs/payments/checkout/fulfillment#webhooks

import firebaseAdmin from '@services/firebase/admin';
import stripe from '@services/stripe';

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

    firebaseAdmin
      .database()
      .ref(`users/${client_reference_id}/courses`)
      .push()
      .set({
        courseId: metadata.courseId,
        packageId: metadata.bundleId,
        invoice: {
          createdAt: firebaseAdmin.database.ServerValue.TIMESTAMP,
          amount: (display_items[0].amount / 100).toFixed(2),
          licensesCount: 1,
          currency: 'USD',
          paymentType: 'STRIPE',
        },
      });
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
