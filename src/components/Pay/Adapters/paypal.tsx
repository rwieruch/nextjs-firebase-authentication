import React from 'react';
import scriptLoader from 'react-async-script-loader';

import PaypalCheckoutBase from '../PaypalCheckout';

type PaypalCheckoutAdapterProps = {
  isScriptLoaded: boolean;
  isScriptLoadSucceed: boolean;
  isShow: boolean;
  coupon: string;
};

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
  'https://www.paypal.com/sdk/js?client-id=sb'
)(PaypalCheckoutAdapter);
