// https://stripe.com/docs/payments/checkout/fulfillment#webhooks

const stripe = require('stripe')(process.env.STRIPE_CLIENT_SECRET);

import { send, text } from 'micro';
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

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    console.log(session);

    const { metadata, client_reference_id, customer_email } = session;

    // Fulfill the purchase...
    // handleCheckoutSession(session);
  }

  // Return a response to acknowledge receipt of the event
  // response.json({ received: true });

  send(response, 200, { received: true });
};

export const config = {
  api: {
    bodyParser: false,
  },
};
