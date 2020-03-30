// https://developer.paypal.com/docs/checkout/integrate/

import React from 'react';
import lf from 'localforage';

import {
  StorefrontCourse,
  usePaypalCreateOrderMutation,
  usePaypalApproveOrderMutation,
} from '@generated/client';
import useIndicators from '@hooks/useIndicators';
import FormAtomButton from '@components/Form/AtomButton';

export type PaypalCheckoutProps = {
  storefrontCourse: StorefrontCourse;
  coupon: string;
  onSuccess: () => void;
  onBack: () => void;
};

const PaypalCheckout = ({
  storefrontCourse,
  coupon,
  onSuccess,
  onBack,
}: PaypalCheckoutProps) => {
  const { courseId } = storefrontCourse;
  const { bundleId } = storefrontCourse.bundle;

  const [
    paypalCreateOrder,
    { loading: createOrderLoading, error: createOrderError },
  ] = usePaypalCreateOrderMutation();

  const [
    paypalApproveOrder,
    { loading: approveOrderLoading, error: approveOrderError },
  ] = usePaypalApproveOrderMutation();

  const { successMessage, destroyMessage } = useIndicators({
    key: 'paypal',
    loading: createOrderLoading || approveOrderLoading,
    error: createOrderError || approveOrderError,
  });

  React.useEffect(() => {
    const createOrder = async () => {
      const partner = JSON.parse(await lf.getItem('partner'));
      const partnerId = partner ? partner.partnerId : '';

      try {
        const { data } = await paypalCreateOrder({
          variables: {
            courseId,
            bundleId,
            coupon,
            partnerId,
          },
        });

        return data?.paypalCreateOrder.orderId;
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
