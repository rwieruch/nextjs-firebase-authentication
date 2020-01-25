// https://stripe.com/docs/payments/accept-a-payment

import React from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {
  injectStripe,
  CardNumberElement,
  CardCVCElement,
  CardExpiryElement,
} from 'react-stripe-elements';

import { StripeForm } from './styles';

const PAYPAL_CREATE_ORDER = gql`
  mutation PaypalCreateOrder(
    $courseId: String!
    $bundleId: String!
    $coupon: String
  ) {
    paypalCreateOrder(
      courseId: $courseId
      bundleId: $bundleId
      coupon: $coupon
    ) {
      orderId
    }
  }
`;

const PAYPAL_APPROVE_ORDER = gql`
  mutation PaypalApproveOrder($orderId: String!) {
    paypalApproveOrder(orderId: $orderId)
  }
`;

export type StripeCheckoutProps = {
  courseId: string;
  bundleId: string;
  coupon: string;
  onSuccess: () => void;
  onError: (error: Error) => void;
  onBack: () => void;
};

const StripeCheckout = ({
  courseId,
  bundleId,
  coupon,
  onSuccess,
  onError,
  onBack,
}: StripeCheckoutProps) => {
  const apolloClient = useApolloClient();

  const handleSubmit = () => {
    // TODO
  };

  return (
    <StripeForm onSubmit={handleSubmit}>
      <label>
        Card number
        <CardNumberElement />
      </label>
      <label>
        Expiration date
        <CardExpiryElement />
      </label>
      <label>
        CVC
        <CardCVCElement />
      </label>

      <div>
        <button
          style={{ marginRight: '8px' }}
          type="button"
          onClick={onBack}
        >
          Go back
        </button>

        <button type="submit">Pay</button>
      </div>
    </StripeForm>
  );
};

export default injectStripe(StripeCheckout);
