import React from 'react';
import styled from 'styled-components';
import { Card } from 'antd';

import { Session } from '@typeDefs/session';
import Layout from '@components/Layout';

import SignInForm from './SignInForm';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledCard = styled(Card)`
  min-width: 200px;
  max-width: 400px;
`;

const SignInPage = () => (
  <Layout>
    <Container>
      <StyledCard title="Log in and get to learn">
        <SignInForm />
      </StyledCard>
    </Container>
  </Layout>
);

SignInPage.isAuthorized = (session: Session) => true;

export default SignInPage;
