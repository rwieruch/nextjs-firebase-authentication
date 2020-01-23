import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Card, Steps, Icon, message } from 'antd';
import ReactCSSTransitionReplace from 'react-css-transition-replace';

import SessionContext from '@context/session';
import * as ROUTES from '@constants/routes';

import Pay from '@components/Pay';
import SignInForm from '@screens/SignIn/SignInForm';
import SignUpForm from '@screens/SignUp/SignUpForm';
import PasswordForgotForm from '@screens/PasswordForgot/PasswordForgotForm';
import FormAtomButton from '@components/Form/AtomButton';

const Container = styled.div`
  min-width: 200px;
  max-width: 400px;
`;

const StyledSteps = styled(Steps)`
  padding: 16px;
`;

const StyledPasswordForgotFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

type PasswordForgotFooterProps = {
  onNavigateSignUp: () => void;
  onNavigateSignIn: () => void;
};

const PasswordForgotFooter = ({
  onNavigateSignUp,
  onNavigateSignIn,
}: PasswordForgotFooterProps) => (
  <StyledPasswordForgotFooter>
    <span>
      Nevermind.&nbsp;
      <FormAtomButton
        type="link"
        onClick={onNavigateSignIn}
        aria-label="sign-in-link"
      >
        Sign in
      </FormAtomButton>
      &nbsp;or&nbsp;
      <FormAtomButton
        type="link"
        onClick={onNavigateSignUp}
        aria-label="sign-up-link"
      >
        sign up
      </FormAtomButton>
      .
    </span>
  </StyledPasswordForgotFooter>
);

const SELECTIONS = {
  SIGN_IN: 'SIGN_IN',
  SIGN_UP: 'SIGN_UP',
  PASSWORD_FORGOT: 'PASSWORD_FORGOT',
};

const FadeWait = styled.div`
  .fade-wait-leave {
    opacity: 1;
  }

  .fade-wait-leave.fade-wait-leave-active {
    opacity: 0;
    transition: opacity 0.4s ease-in;
  }

  .fade-wait-enter {
    opacity: 0;
  }

  .fade-wait-enter.fade-wait-enter-active {
    opacity: 1;
    /* Delay the enter animation until the leave completes */
    transition: opacity 0.4s ease-in 0.6s;
  }

  .fade-wait-height {
    transition: height 0.6s ease-in-out;
  }
`;

type AccountProps = {
  onSuccess: () => void;
  onLoadingMessage: () => void;
  onSuccessMessage: () => void;
  onErrorMessage: (error: any) => void;
};

const Account = ({
  onSuccess,
  onLoadingMessage,
  onSuccessMessage,
  onErrorMessage,
}: AccountProps) => {
  const [currentSelection, setCurrentSelection] = React.useState(
    SELECTIONS.SIGN_IN
  );

  const handleNavigateSignIn = () => {
    setCurrentSelection(SELECTIONS.SIGN_IN);
  };

  const handleNavigateSignUp = () => {
    setCurrentSelection(SELECTIONS.SIGN_UP);
  };

  const handleNavigatePasswordForgot = () => {
    setCurrentSelection(SELECTIONS.PASSWORD_FORGOT);
  };

  return (
    <FadeWait>
      <ReactCSSTransitionReplace
        transitionName="fade-wait"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        <div key={currentSelection}>
          {currentSelection === SELECTIONS.SIGN_IN && (
            <SignInForm
              onSuccess={onSuccess}
              onLoadingMessage={onLoadingMessage}
              onSuccessMessage={onSuccessMessage}
              onErrorMessage={onErrorMessage}
              onNavigateSignUp={handleNavigateSignUp}
              onNavigatePasswordForgot={handleNavigatePasswordForgot}
            />
          )}

          {currentSelection === SELECTIONS.SIGN_UP && (
            <SignUpForm
              onSuccess={onSuccess}
              onLoadingMessage={onLoadingMessage}
              onSuccessMessage={onSuccessMessage}
              onErrorMessage={onErrorMessage}
              onNavigateSignIn={handleNavigateSignIn}
            />
          )}

          {currentSelection === SELECTIONS.PASSWORD_FORGOT && (
            <>
              <PasswordForgotForm
                onLoadingMessage={onLoadingMessage}
                onSuccessMessage={onSuccessMessage}
                onErrorMessage={onErrorMessage}
              />
              <PasswordForgotFooter
                onNavigateSignUp={handleNavigateSignUp}
                onNavigateSignIn={handleNavigateSignIn}
              />
            </>
          )}
        </div>
      </ReactCSSTransitionReplace>
    </FadeWait>
  );
};

const CheckoutWizard = () => {
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
    if (currentStep === 0) {
      setCurrentStep(1);
    } else {
      router.push(ROUTES.INDEX);
    }
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

  const handleErrorMessageAccount = (error: any) => {
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

      <Card>
        <div className="steps-content">
          {currentStep === 0 && (
            <Account
              onSuccess={handleNext}
              onLoadingMessage={handleLoadingMessageAccount}
              onSuccessMessage={handleSuccessMessageAccount}
              onErrorMessage={handleErrorMessageAccount}
            />
          )}
          {currentStep === 1 && <Pay onSuccess={handleNext} />}
        </div>
      </Card>
    </Container>
  );
};

export default CheckoutWizard;
