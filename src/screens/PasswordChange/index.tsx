import React from 'react';
import styled from 'styled-components';
import { Card, message, Layout as AntdLayout } from 'antd';

import { Session } from '@typeDefs/session';
import Layout from '@components/Layout';

import PasswordChangeForm from './PasswordChangeForm';

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

const PasswordChangePage = () => {
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
      <StyledContent>
        <StyledCard title="Change your password">
          <PasswordChangeForm
            onLoadingMessage={handleLoadingMessage}
            onSuccessMessage={handleSuccessMessage}
            onErrorMessage={handleErrorMessage}
          />
        </StyledCard>
      </StyledContent>
    </Layout>
  );
};

PasswordChangePage.isAuthorized = (session: Session) => !!session;

export default PasswordChangePage;
