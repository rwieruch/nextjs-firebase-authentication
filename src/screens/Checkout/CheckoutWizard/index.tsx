import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Card, Steps, Icon, message } from 'antd';

import { GetStorefront } from '@generated/GetStorefront';
import SessionContext from '@context/session';
import * as ROUTES from '@constants/routes';

import CheckoutWizardAccount from '../CheckoutWizardAccount';
import CheckoutWizardPay from '../CheckoutWizardPay';

const Container = styled.div`
  min-width: 200px;
  max-width: 400px;
`;

const StyledSteps = styled(Steps)`
  padding: 16px;
`;

type CheckoutWizardProps = {
  data: GetStorefront;
  imageUrl: string;
};

const CheckoutWizard = ({ data, imageUrl }: CheckoutWizardProps) => {
  const session = React.useContext(SessionContext);
  const router = useRouter();

  const [currentStep, setCurrentStep] = React.useState(
    session ? 1 : 0
  );

  const [pending, setLoading] = React.useState({
    one: false,
    two: false,
  });

  const handleNext = () => {
    setCurrentStep(1);
  };

  const handleSuccess = () => {
    router.push(ROUTES.INDEX);
  };

  const handleError = (error: Error) => {
    message.error({
      content: error.message,
      duration: 2,
    });
  };

  const handleLoadingMessageAccount = () => {
    setLoading({ ...pending, one: true });
  };

  const handleSuccessMessageAccount = () => {
    setLoading({ ...pending, one: false });

    message.success({
      content: 'Success!',
      key: 'checkout',
      duration: 2,
    });
  };

  const handleErrorMessageAccount = (error: Error) => {
    setLoading({ ...pending, one: false });

    message.error({
      content: error.message,
      key: 'checkout',
      duration: 2,
    });
  };

  return (
    <Container>
      <StyledSteps current={currentStep}>
        <Steps.Step
          title="Account"
          icon={pending.one && <Icon type="loading" />}
        />
        <Steps.Step title="Pay" />
      </StyledSteps>

      <Card
        cover={
          currentStep === 1 &&
          imageUrl && (
            <img
              style={{ padding: '16px 64px 0' }}
              alt="cover"
              src={imageUrl}
            />
          )
        }
      >
        <div className="steps-content">
          {currentStep === 0 && (
            <CheckoutWizardAccount
              onSuccess={handleNext}
              onLoadingMessage={handleLoadingMessageAccount}
              onSuccessMessage={handleSuccessMessageAccount}
              onErrorMessage={handleErrorMessageAccount}
            />
          )}

          {currentStep === 1 && !!data.storefront && (
            <CheckoutWizardPay
              course={data.storefront.course}
              onSuccess={handleSuccess}
              onError={handleError}
            />
          )}

          {currentStep === 1 && !data.storefront && (
            <>
              You haven't selected a course yet. Choose a course
              first. You can find all the courses in the navigation.
            </>
            // TODO
          )}
        </div>
      </Card>
    </Container>
  );
};

export default CheckoutWizard;
