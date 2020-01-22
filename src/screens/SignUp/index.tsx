import React from 'react';
import styled from 'styled-components';
import { Card, message } from 'antd';

import { Session } from '@typeDefs/session';
import Layout from '@components/Layout';

import SignUpForm from './SignUpForm';

const SignUpPageLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledCard = styled(Card)`
  min-width: 200px;
  max-width: 400px;
`;

const SignUpPage = () => {
  const handleLoadingMessage = () => {
    message.loading({
      content: 'Loading ...',
      key: 'register',
      duration: 0,
    });
  };

  const handleSuccessMessage = () => {
    message.success({
      content: 'Success!',
      key: 'register',
      duration: 2,
    });
  };

  const handleErrorMessage = (error: any) => {
    message.error({
      content: error.message,
      key: 'register',
      duration: 2,
    });
  };

  return (
    <Layout>
      <SignUpPageLayout>
        <StyledCard title="Register your account">
          <SignUpForm
            onLoadingMessage={handleLoadingMessage}
            onSuccessMessage={handleSuccessMessage}
            onErrorMessage={handleErrorMessage}
          />
        </StyledCard>
      </SignUpPageLayout>
    </Layout>
  );
};

SignUpPage.isAuthorized = (session: Session) => true;

export default SignUpPage;
