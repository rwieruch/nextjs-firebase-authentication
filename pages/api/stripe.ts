// https://stripe.com/docs/payments/checkout/fulfillment#webhooks

import { ServerRequest, ServerResponse } from '@typeDefs/server';

export default (req: ServerRequest, res: ServerResponse) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ name: 'John Doe' }));
};

// call graphql api with a apollo client from htere

// metadata: {
//   courseId,
//   bundleId,
// },

/*
app.post('/payment/session-complete', async (req, res) => {
    const stripe = Stripe('YOUR_STRIPE_SECRET_KEY');

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        req.headers['stripe-signature'],
        'YOUR_STRIPE_WEBHOOK_SECRET'
      );
    } catch (error) {
      return res.status(400).send(`Webhook Error: ${error.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      try {
        // complete your customer's order
        // e.g. save the purchased product into your database
        // take the clientReferenceId to map your customer to a product
      } catch (error) {
        return res.status(404).send({ error, session });
      }
    }

    return res.status(200).send({ received: true });
  });

  return app;
};
*/
