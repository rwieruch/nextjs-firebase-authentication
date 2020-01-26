// https://stripe.com/docs/payments/checkout/one-time#create-one-time-payments

import React from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { Button } from 'antd';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const STRIPE_CREATE_ORDER = gql`
  mutation StripeCreateOrder(
    $imageUrl: String!
    $courseId: String!
    $bundleId: String!
    $coupon: String
  ) {
    stripeCreateOrder(
      imageUrl: $imageUrl
      courseId: $courseId
      bundleId: $bundleId
      coupon: $coupon
    ) {
      id
    }
  }
`;

export type StripeCheckoutProps = {
  imageUrl: string;
  courseId: string;
  bundleId: string;
  coupon: string;
  onSuccess: () => void;
  onError: (error: Error) => void;
  onBack: () => void;
};

const StripeCheckout = ({
  imageUrl,
  courseId,
  bundleId,
  coupon,
  onSuccess,
  onError,
  onBack,
}: StripeCheckoutProps) => {
  const apolloClient = useApolloClient();

  const handlePay = async () => {
    const { data } = await apolloClient.mutate({
      mutation: STRIPE_CREATE_ORDER,
      variables: {
        imageUrl,
        courseId,
        bundleId,
        coupon,
      },
    });

    const { error } = await (window as any)
      .Stripe(process.env.STRIPE_CLIENT_ID)
      .redirectToCheckout({
        sessionId: data.stripeCreateOrder.id,
      });

    onError(error);
  };

  return (
    <Container>
      <Button type="link" onClick={onBack}>
        Go back
      </Button>
      <Button type="primary" onClick={handlePay}>
        Pay
      </Button>
    </Container>
  );
};

export default StripeCheckout;
