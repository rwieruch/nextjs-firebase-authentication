// https://developer.paypal.com/docs/checkout/integrate/

import React from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';

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
};

const PaypalCheckout = ({
  courseId,
  bundleId,
  coupon,
  onSuccess,
  onError,
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

          console.log(data);

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

  return <div id="paypal-button-container"></div>;
};

export default PaypalCheckout;
