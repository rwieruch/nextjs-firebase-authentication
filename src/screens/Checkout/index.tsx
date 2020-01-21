import React from 'react';
import styled from 'styled-components';

import { Session } from '@typeDefs/session';
import Layout from '@components/Layout';

import CheckoutWizard from './CheckoutWizard';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CheckoutPage = () => (
  <Layout>
    <Container>
      <CheckoutWizard />
    </Container>
  </Layout>
);

CheckoutPage.isAuthorized = (session: Session) => true;

export default CheckoutPage;
