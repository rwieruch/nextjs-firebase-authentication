import React from 'react';
import styled from 'styled-components';
import { Card, message } from 'antd';

import { Session } from '@typeDefs/session';
import Layout from '@components/Layout';

import PasswordForgotForm from './PasswordForgotForm';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledCard = styled(Card)`
  min-width: 200px;
  max-width: 400px;
`;

const PasswordForgotPage = () => {
  const handleLoadingMessage = () => {
    message.loading({
      content: 'Loading ...',
      key: 'password',
      duration: 0,
    });
  };

  const handleSuccessMessage = () => {
    message.success({
      content: 'Success!',
      key: 'password',
      duration: 2,
    });
  };

  const handleErrorMessage = (error: Error) => {
    message.error({
      content: error.message,
      key: 'password',
      duration: 2,
    });
  };

  return (
    <Layout>
      <Container>
        <StyledCard title="Reset your password">
          <PasswordForgotForm
            onLoadingMessage={handleLoadingMessage}
            onSuccessMessage={handleSuccessMessage}
            onErrorMessage={handleErrorMessage}
          />
        </StyledCard>
      </Container>
    </Layout>
  );
};

PasswordForgotPage.isAuthorized = (session: Session) => true;

export default PasswordForgotPage;
