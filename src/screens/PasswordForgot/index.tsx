import React from 'react';
import styled from 'styled-components';
import { Card } from 'antd';

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

const PasswordForgotPage = () => (
  <Layout>
    <Container>
      <StyledCard title="Reset your password">
        <PasswordForgotForm />
      </StyledCard>
    </Container>
  </Layout>
);

PasswordForgotPage.isAuthorized = (session: Session) => true;

export default PasswordForgotPage;
