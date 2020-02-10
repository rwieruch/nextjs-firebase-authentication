// https://stripe.com/docs/payments/checkout/one-time#create-one-time-payments

import React from 'react';
import { Button, message } from 'antd';

import {
  StorefrontCourse,
  useStripeCreateOrderMutation,
} from '@generated/client';
import useErrorIndicator from '@hooks/useErrorIndicator';

import { STRIPE_CREATE_ORDER } from '@queries/stripe';

export type StripeCheckoutProps = {
  storefrontCourse: StorefrontCourse;
  coupon: string;
};

const StripeCheckout = ({
  storefrontCourse,
  coupon,
}: StripeCheckoutProps) => {
  const { courseId } = storefrontCourse;
  const { bundleId, imageUrl } = storefrontCourse.bundle;

  const [
    stripeCreateOrder,
    { loading, error },
  ] = useStripeCreateOrderMutation(STRIPE_CREATE_ORDER);

  useErrorIndicator({
    error,
  });

  const handlePay = async () => {
    let result;

    try {
      result = await stripeCreateOrder({
        variables: {
          imageUrl,
          courseId,
          bundleId,
          coupon,
        },
      });
    } catch (error) {}

    if (result) {
      const stripeResult = await (window as any)
        .Stripe(process.env.STRIPE_CLIENT_ID)
        .redirectToCheckout({
          sessionId: result?.data?.stripeCreateOrder.id,
        });

      stripeResult.error &&
        message.error({
          content: stripeResult.error.message,
          duration: 2,
        });
    }
  };

  return (
    <Button
      type="primary"
      aria-label="stripe-checkout"
      loading={loading}
      onClick={handlePay}
    >
      Credit Card
    </Button>
  );
};

export default StripeCheckout;
