// https://stripe.com/docs/payments/checkout/one-time#create-one-time-payments

import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button } from 'antd';

import useErrorIndicator from '@hooks/useErrorIndicator';

export const CREATE_FREE_COURSE = gql`
  mutation CreateFreeCourse($courseId: String!, $bundleId: String!) {
    createFreeCourse(courseId: $courseId, bundleId: $bundleId)
  }
`;

export type FreeCheckoutProps = {
  courseId: string;
  bundleId: string;
  onSuccess: () => void;
};

const FreeCheckout = ({
  courseId,
  bundleId,
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
        variables: { courseId, bundleId },
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
