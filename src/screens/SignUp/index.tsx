import React from 'react';
import styled from 'styled-components';
import { Card } from 'antd';

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

export default SignUpPage;
