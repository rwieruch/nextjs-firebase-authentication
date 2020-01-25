// https://developer.paypal.com/docs/checkout/reference/server-integration/setup-sdk/

import checkoutNodeJssdk from '@paypal/checkout-server-sdk';

const environment = () => {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (process.env.NODE_ENV === 'production') {
    return new checkoutNodeJssdk.core.LiveEnvironment(
      clientId,
      clientSecret
    );
  } else {
    return new checkoutNodeJssdk.core.SandboxEnvironment(
      clientId,
      clientSecret
    );
  }
};

const client = () => {
  return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
};

export default client;
