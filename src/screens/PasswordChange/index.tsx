import React from 'react';
import styled from 'styled-components';
import { Card, Layout as AntdLayout } from 'antd';

import type { Session } from '@typeDefs/session';
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
  return (
    <Layout>
      <StyledContent>
        <StyledCard title="Change your password">
          <PasswordChangeForm />
        </StyledCard>
      </StyledContent>
    </Layout>
  );
};

PasswordChangePage.isAuthorized = (session: Session) => !!session;

export default PasswordChangePage;
