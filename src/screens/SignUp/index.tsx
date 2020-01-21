import React from 'react';
import styled from 'styled-components';
import { Card } from 'antd';

import { Session } from '@typeDefs/session';
import Layout from '@components/Layout';

import SignUpForm from './SignUpForm';

const SignUpPageLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledCard = styled(Card)`
  min-width: 200px;
  max-width: 400px;
`;

const SignUpPage = () => (
  <Layout>
    <SignUpPageLayout>
      <StyledCard title="Register your account">
        <SignUpForm />
      </StyledCard>
    </SignUpPageLayout>
  </Layout>
);

SignUpPage.isAuthorized = (session: Session) => true;

export default SignUpPage;
