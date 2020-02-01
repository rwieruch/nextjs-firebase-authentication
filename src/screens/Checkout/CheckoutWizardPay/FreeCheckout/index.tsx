// https://stripe.com/docs/payments/checkout/one-time#create-one-time-payments

import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button } from 'antd';
import { useRouter } from 'next/router';

import * as ROUTES from '@constants/routes';
import useErrorIndicator from '@hooks/useErrorIndicator';

const CREATE_FREE_COURSE = gql`
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
    await createFreeCourse({
      variables: { courseId, bundleId },
    });

    onSuccess();
  };

  return (
    <Button type="primary" loading={loading} onClick={handlePay}>
      Unlock
    </Button>
  );
};

export default FreeCheckout;
