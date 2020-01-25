// https://developer.paypal.com/docs/checkout/integrate/

import React from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import FormAtomButton from '@components/Form/AtomButton';

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

export type PaypalCheckoutProps = {
  courseId: string;
  bundleId: string;
  coupon: string;
  onSuccess: () => void;
  onError: (error: Error) => void;
  onBack: () => void;
};

const PaypalCheckout = ({
  courseId,
  bundleId,
  coupon,
  onSuccess, // TODO
  onError, // TODO
  onBack,
}: PaypalCheckoutProps) => {
  const apolloClient = useApolloClient();

  React.useEffect(() => {
    (window as any).paypal
      .Buttons({
        createOrder: async () => {
          const { data } = await apolloClient.mutate({
            mutation: PAYPAL_CREATE_ORDER,
            variables: {
              courseId,
              bundleId,
              coupon,
            },
          });

          return data.paypalCreateOrder.orderId;
        },
        onApprove: async (data: { orderID: string }) => {
          await apolloClient.mutate({
            mutation: PAYPAL_APPROVE_ORDER,
            variables: {
              orderId: data.orderID,
            },
          });
        },
      })
      .render('#paypal-button-container');
  }, []);

  return (
    <>
      <div id="paypal-button-container"></div>
      <FormAtomButton type="link" onClick={onBack}>
        Go back
      </FormAtomButton>
    </>
  );
};

export default PaypalCheckout;
