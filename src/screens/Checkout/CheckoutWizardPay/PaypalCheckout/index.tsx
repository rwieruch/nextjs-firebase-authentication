// https://developer.paypal.com/docs/checkout/integrate/

import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import { Course } from '@generated/client';
import {
  PAYPAL_CREATE_ORDER,
  PAYPAL_APPROVE_ORDER,
} from '@queries/paypal';
import useIndicators from '@hooks/useIndicators';
import FormAtomButton from '@components/Form/AtomButton';

export type PaypalCheckoutProps = {
  course: Course;
  coupon: string;
  onSuccess: () => void;
  onBack: () => void;
};

const PaypalCheckout = ({
  course,
  coupon,
  onSuccess,
  onBack,
}: PaypalCheckoutProps) => {
  const { courseId } = course;
  const { bundleId } = course.bundle;

  const [
    paypalCreateOrder,
    { loading: createOrderLoading, error: createOrderError },
  ] = useMutation(PAYPAL_CREATE_ORDER);

  const [
    paypalApproveOrder,
    { loading: approveOrderLoading, error: approveOrderError },
  ] = useMutation(PAYPAL_APPROVE_ORDER);

  const { successMessage, destroyMessage } = useIndicators({
    key: 'paypal',
    loading: createOrderLoading || approveOrderLoading,
    error: createOrderError || approveOrderError,
  });

  React.useEffect(() => {
    const createOrder = async () => {
      try {
        const { data } = await paypalCreateOrder({
          variables: {
            courseId,
            bundleId,
            coupon,
          },
        });

        return data.paypalCreateOrder.orderId;
      } catch (error) {}
    };

    const onApprove = async (data: { orderID: string }) => {
      try {
        await paypalApproveOrder({
          variables: { orderId: data.orderID },
        });

        successMessage();
        onSuccess();
      } catch (error) {}
    };

    const onCancel = () => {
      destroyMessage.current();
    };

    (window as any).paypal
      .Buttons({
        createOrder,
        onApprove,
        onCancel,
      })
      .render('#paypal-button-container');
  }, []);

  return (
    <>
      <div id="paypal-button-container"></div>
      <FormAtomButton
        type="link"
        aria-label="back-button"
        onClick={onBack}
      >
        Go back
      </FormAtomButton>
    </>
  );
};

export default PaypalCheckout;
