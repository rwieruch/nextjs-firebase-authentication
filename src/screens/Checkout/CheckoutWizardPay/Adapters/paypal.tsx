// https://developer.paypal.com/docs/checkout/integrate/

import React from 'react';
import scriptLoader from 'react-async-script-loader';

import PaypalCheckoutBase, {
  PaypalCheckoutProps,
} from '../PaypalCheckout';

type PaypalCheckoutAdapterProps = {
  isScriptLoaded: boolean;
  isScriptLoadSucceed: boolean;
  isShow: boolean;
} & PaypalCheckoutProps;

const PaypalCheckoutAdapter = ({
  isScriptLoaded,
  isScriptLoadSucceed,
  isShow,
  ...props
}: PaypalCheckoutAdapterProps) =>
  isScriptLoaded &&
  isScriptLoadSucceed &&
  isShow && <PaypalCheckoutBase {...props} />;

export default scriptLoader(
  `https://www.paypal.com/sdk/js?client-id=${process.env
    .PAYPAL_CLIENT_ID || 'sb'}`
)(PaypalCheckoutAdapter);
