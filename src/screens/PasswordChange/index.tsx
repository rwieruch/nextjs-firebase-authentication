import React from 'react';
import styled from 'styled-components';
import { Card } from 'antd';

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

const PasswordChangePage = () => (
  <Layout>
    <PasswordChangePageLayout>
      <StyledCard title="Change your password">
        <PasswordChangeForm />
      </StyledCard>
    </PasswordChangePageLayout>
  </Layout>
);

PasswordChangePage.isAuthorized = (session: Session) => !!session;

export default PasswordChangePage;
