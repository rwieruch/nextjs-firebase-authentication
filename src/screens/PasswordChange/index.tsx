import React from 'react';
import styled from 'styled-components';
import { Card, message } from 'antd';

import { Session } from '@typeDefs/session';
import Layout from '@components/Layout';

import PasswordChangeForm from './PasswordChangeForm';

const PasswordChangePageLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

  const handleErrorMessage = (error: any) => {
    message.error({
      content: error.message,
      key: 'password',
      duration: 2,
    });
  };

  return (
    <Layout>
      <PasswordChangePageLayout>
        <StyledCard title="Change your password">
          <PasswordChangeForm
            onLoadingMessage={handleLoadingMessage}
            onSuccessMessage={handleSuccessMessage}
            onErrorMessage={handleErrorMessage}
          />
        </StyledCard>
      </PasswordChangePageLayout>
    </Layout>
  );
};

PasswordChangePage.isAuthorized = (session: Session) => !!session;

export default PasswordChangePage;
