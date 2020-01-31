// https://developer.paypal.com/docs/checkout/integrate/

import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import useIndicators from '@hooks/useIndicators';
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
  mutation PaypalApproveOrder(
    $courseId: String!
    $bundleId: String!
    $orderId: String!
  ) {
    paypalApproveOrder(
      courseId: $courseId
      bundleId: $bundleId
      orderId: $orderId
    )
  }
`;

export type PaypalCheckoutProps = {
  courseId: string;
  bundleId: string;
  coupon: string;
  onSuccess: () => void;
  onBack: () => void;
};

const PaypalCheckout = ({
  courseId,
  bundleId,
  coupon,
  onSuccess,
  onBack,
}: PaypalCheckoutProps) => {
  const [
    paypalCreateOrder,
    { loading: createOrderLoading, error: createOrderError },
  ] = useMutation(PAYPAL_CREATE_ORDER, {
    variables: {
      courseId,
      bundleId,
      coupon,
    },
  });

  const [
    paypalApproveOrder,
    { loading: approveOrderLoading, error: approveOrderError },
  ] = useMutation(PAYPAL_APPROVE_ORDER);

  const successMessage = useIndicators({
    key: 'paypal',
    loading: createOrderLoading || approveOrderLoading,
    error: createOrderError || approveOrderError,
  });

  React.useEffect(() => {
    const createOrder = async () => {
      const { data } = await paypalCreateOrder();
      return data.paypalCreateOrder.orderId;
    };

    const onApprove = async (data: { orderID: string }) => {
      await paypalApproveOrder({
        variables: { orderId: data.orderID, courseId, bundleId },
      });

      successMessage();
      onSuccess();
    };

    (window as any).paypal
      .Buttons({
        createOrder,
        onApprove,
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
