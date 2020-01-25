// https://github.com/stripe/react-stripe-elements

import React from 'react';
import scriptLoader from 'react-async-script-loader';
import { StripeProvider, Elements } from 'react-stripe-elements';

import StripeCheckoutBase, {
  StripeCheckoutProps,
} from '../StripeCheckout';

type StripeCheckoutAdapterProps = {
  isScriptLoaded: boolean;
  isScriptLoadSucceed: boolean;
  isShow: boolean;
} & StripeCheckoutProps;

const StripeCheckoutAdapter = ({
  isScriptLoaded,
  isScriptLoadSucceed,
  isShow,
  ...props
}: StripeCheckoutAdapterProps) =>
  isScriptLoaded &&
  isScriptLoadSucceed &&
  isShow && (
    <StripeProvider apiKey={process.env.STRIPE_CLIENT_ID || ''}>
      <Elements>
        <StripeCheckoutBase {...props} />
      </Elements>
    </StripeProvider>
  );

export default scriptLoader(`https://js.stripe.com/v3/`)(
  StripeCheckoutAdapter
);
