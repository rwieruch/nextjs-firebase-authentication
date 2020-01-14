import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Card, Col, Row, Typography } from 'antd';

import * as ROUTES from '@constants/routes';
import Layout from '@components/Layout';
import withAuthorization from '@components/Session/withAuthorization';
import SessionContext from '@context/session';

import { Session } from '@typeDefs/session';

const Container = styled.div`
  margin: 32px;
`;

const AccountPage = () => {
  const session = React.useContext(SessionContext);

  return (
    <Layout>
      <Container>
        <Typography.Title>Your Account</Typography.Title>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Card title="Details">
              <ul>
                <li>
                  <strong>ID:</strong> {session?.authUser?.uid}
                </li>
                <li>
                  <strong>Email:</strong> {session?.authUser?.email}
                </li>
              </ul>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Security">
              <ul>
                <li>
                  <Link href={ROUTES.PASSWORD_CHANGE}>
                    <a>Change Password</a>
                  </Link>
                </li>
                <li>
                  <Link href={ROUTES.PASSWORD_FORGOT}>
                    <a>Forgot Password</a>
                  </Link>
                </li>
              </ul>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Referral">
              <ul>
                <li>
                  <Link href={ROUTES.REFERRAL}>
                    <a>Referral Program</a>
                  </Link>
                </li>
              </ul>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Troubleshoot">
              <ul>
                <li>
                  <a href="mailto:hello@rwieruch.com">Contact</a>
                </li>
              </ul>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

const condition = (session: Session): boolean => !!session.authUser;

export default withAuthorization(condition)(AccountPage);
