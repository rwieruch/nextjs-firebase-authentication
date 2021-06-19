// https://stripe.com/docs/payments/checkout/one-time#create-one-time-payments

import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Button } from 'antd';

import useErrorIndicator from '@hooks/useErrorIndicator';
import { CREATE_FREE_COURSE } from '@queries/course';

export type FreeCheckoutProps = {
  courseId: string;
  bundleId: string;
  coupon: string;
  onSuccess: () => void;
};

const FreeCheckout = ({
  courseId,
  bundleId,
  coupon,
  onSuccess,
}: FreeCheckoutProps) => {
  const [createFreeCourse, { loading, error }] = useMutation(
    CREATE_FREE_COURSE
  );

  useErrorIndicator({
    error,
  });

  const handlePay = async () => {
    try {
      await createFreeCourse({
        variables: { courseId, bundleId, coupon },
      });

      onSuccess();
    } catch (error) {}
  };

  return (
    <Button
      type="primary"
      aria-label="free-checkout"
      loading={loading}
      onClick={handlePay}
    >
      Unlock
    </Button>
  );
};

export default FreeCheckout;
