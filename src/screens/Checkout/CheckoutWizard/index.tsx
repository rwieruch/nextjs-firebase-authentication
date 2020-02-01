import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Card, Steps } from 'antd';

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
  const router = useRouter();

  const session = React.useContext(SessionContext);

  const [currentStep, setCurrentStep] = React.useState(
    session ? 1 : 0
  );

  const handleNext = () => {
    setCurrentStep(1);
  };

  const handleSuccess = () => {
    router.push(ROUTES.INDEX);
  };

  return (
    <Container>
      <StyledSteps current={currentStep}>
        <Steps.Step title="Account" />
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
            <CheckoutWizardAccount onSuccess={handleNext} />
          )}

          {currentStep === 1 && !!data.storefront && (
            <CheckoutWizardPay
              imageUrl={imageUrl}
              course={data.storefront.course}
              onSuccess={handleSuccess}
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
