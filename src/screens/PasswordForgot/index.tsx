import React from 'react';
import styled from 'styled-components';
import { Card, Layout as AntdLayout } from 'antd';

import type { Session } from '@typeDefs/session';
import Layout from '@components/Layout';

import PasswordForgotForm from './PasswordForgotForm';

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

const PasswordForgotPage = () => {
  return (
    <Layout>
      <StyledContent>
        <StyledCard title="Reset your password">
          <PasswordForgotForm />
        </StyledCard>
      </StyledContent>
    </Layout>
  );
};

PasswordForgotPage.isAuthorized = (session: Session) => true;

export default PasswordForgotPage;
