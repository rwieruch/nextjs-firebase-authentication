// https://stripe.com/docs/payments/checkout/one-time#create-one-time-payments

import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button } from 'antd';
import { useRouter } from 'next/router';

import * as ROUTES from '@constants/routes';
import useIndicators from '@hooks/useIndicators';

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
  const router = useRouter();

  const [createFreeCourse, { loading, error }] = useMutation(
    CREATE_FREE_COURSE
  );

  const successMessage = useIndicators({
    key: 'free',
    loading,
    error,
  });

  const handlePay = async () => {
    // TODO check if works in production, if works, use for paypal and stripe too
    router.prefetch(ROUTES.INDEX);

    await createFreeCourse({
      variables: { courseId, bundleId },
    });

    successMessage();
    onSuccess();
  };

  return (
    <Button type="primary" loading={loading} onClick={handlePay}>
      Unlock
    </Button>
  );
};

export default FreeCheckout;
