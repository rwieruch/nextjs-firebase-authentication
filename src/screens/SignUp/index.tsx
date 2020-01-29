import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Card, message, Layout as AntdLayout } from 'antd';

import * as ROUTES from '@constants/routes';
import { Session } from '@typeDefs/session';
import Layout from '@components/Layout';

import SignUpForm from './SignUpForm';

const StyledContent = styled(AntdLayout.Content)`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 56px;
`;

const StyledCard = styled(Card)`
  min-width: 200px;
  max-width: 400px;
`;

const SignUpPage = () => {
  const router = useRouter();

  const handleSuccess = () => {
    router.push(ROUTES.INDEX);
  };

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

  const handleErrorMessage = (error: Error) => {
    message.error({
      content: error.message,
      key: 'register',
      duration: 2,
    });
  };

  return (
    <Layout>
      <StyledContent>
        <StyledCard title="Register your account">
          <SignUpForm
            onSuccess={handleSuccess}
            onLoadingMessage={handleLoadingMessage}
            onSuccessMessage={handleSuccessMessage}
            onErrorMessage={handleErrorMessage}
          />
        </StyledCard>
      </StyledContent>
    </Layout>
  );
};

SignUpPage.isAuthorized = (session: Session) => true;

export default SignUpPage;
