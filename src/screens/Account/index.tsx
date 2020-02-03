import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import styled from 'styled-components';
import {
  Card,
  Col,
  Row,
  Typography,
  Layout as AntdLayout,
} from 'antd';

import { User } from '@generated/client';
import { GET_ME } from '@queries/user';
import { Session } from '@typeDefs/session';
import * as ROUTES from '@constants/routes';
import Layout from '@components/Layout';

const StyledContent = styled(AntdLayout.Content)`
  margin: calc(56px + 32px) 32px 32px;
`;

interface AccountPageProps {
  data: {
    me: User;
  };
}

type NextAuthPage = NextPage<AccountPageProps> & {
  isAuthorized: (session: Session) => boolean;
};

const AccountPage: NextAuthPage = ({ data }) => {
  return (
    <Layout>
      <StyledContent>
        <Typography.Title>Your Account</Typography.Title>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Card title="Details">
              <ul>
                <li>
                  <strong>ID:</strong> {data?.me?.uid}
                </li>
                <li>
                  <strong>Email:</strong> {data?.me?.email}
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
      </StyledContent>
    </Layout>
  );
};

AccountPage.isAuthorized = (session: Session) => !!session;

AccountPage.getInitialProps = async ctx => {
  const isServer = ctx.req || ctx.res;

  const context = isServer
    ? {
        context: {
          headers: {
            cookie: ctx?.req?.headers.cookie,
          },
        },
      }
    : null;

  const { data } = await ctx.apolloClient.query({
    query: GET_ME,
    ...(isServer && context),
  });

  return { data };
};

export default AccountPage;
