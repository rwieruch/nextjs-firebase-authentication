import React from 'react';
import styled from 'styled-components';
import { Card, Layout as AntdLayout } from 'antd';

import { Session } from '@typeDefs/session';
import Layout from '@components/Layout';

import EmailChangeForm from './EmailChangeForm';

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

const EmailChangePage = () => {
  return (
    <Layout>
      <StyledContent>
        <StyledCard title="Change your email">
          <EmailChangeForm />
        </StyledCard>
      </StyledContent>
    </Layout>
  );
};

EmailChangePage.isAuthorized = (session: Session) => !!session;

export default EmailChangePage;
