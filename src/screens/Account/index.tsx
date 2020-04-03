import React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import { Card, Col, Row, Layout as AntdLayout } from 'antd';

import { User } from '@generated/client';
import { GET_ME } from '@queries/user';
import { Session } from '@typeDefs/session';
import * as ROUTES from '@constants/routes';
import Layout from '@components/Layout';
import Link from '@components/Link';

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
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Card title="Details">
              <ul>
                <li>
                  <strong>ID:</strong> {data?.me?.uid}
                </li>
                <li>
                  <strong>Username:</strong> {data?.me?.username}
                </li>
                <li>
                  <strong>Email:</strong> {data?.me?.email} (
                  <Link href={ROUTES.EMAIL_CHANGE}>Change Email</Link>
                  )
                </li>
              </ul>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Security">
              <ul>
                <li>
                  <Link href={ROUTES.PASSWORD_CHANGE}>
                    Change Password
                  </Link>
                </li>
                <li>
                  <Link href={ROUTES.PASSWORD_FORGOT}>
                    Forgot Password
                  </Link>
                </li>
                <li>
                  <Link href={ROUTES.EMAIL_CHANGE}>Change Email</Link>
                </li>
              </ul>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Partner">
              <ul>
                <li>
                  <Link href={ROUTES.PARTNER}>Partner Program</Link>
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
