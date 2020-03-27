import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import styled from 'styled-components';
import { Card, Layout as AntdLayout, Breadcrumb } from 'antd';

import * as ROUTES from '@constants/routes';
import { User } from '@generated/client';
import { GET_ME } from '@queries/user';
import { Session } from '@typeDefs/session';
import Layout from '@components/Layout';

const tabList = [
  {
    key: 'tab1',
    tab: 'tab1',
  },
  {
    key: 'tab2',
    tab: 'tab2',
  },
];

const contentList: { [key: string]: React.ReactNode } = {
  tab1: <p>content1</p>,
  tab2: <p>content2</p>,
};

const StyledContent = styled(AntdLayout.Content)`
  margin: calc(56px + 32px) 32px 32px;
`;

const StyledCard = styled(Card)`
  &:not(:first-of-type) {
    margin-top: 16px;
  }
`;

interface ReferralPageeProps {
  data: {
    me: User;
  };
}

type NextAuthPage = NextPage<ReferralPageeProps> & {
  isAuthorized: (session: Session) => boolean;
};

const ReferralPage: NextAuthPage = ({ data }) => {
  console.log(data.me);

  const [tab, setTab] = React.useState('tab1');

  const handleTabChange = (key: string) => {
    setTab(key);
  };

  return (
    <Layout>
      <StyledContent>
        <Breadcrumb style={{ flex: '0', margin: '16px 0' }}>
          <Breadcrumb.Item>
            <Link href={ROUTES.ACCOUNT}>
              <a>Account</a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Referral Program</Breadcrumb.Item>
        </Breadcrumb>

        <StyledCard
          tabList={tabList}
          activeTabKey={tab}
          onTabChange={handleTabChange}
        >
          {contentList[tab]}
        </StyledCard>
      </StyledContent>
    </Layout>
  );
};

ReferralPage.isAuthorized = (session: Session) => !!session;

ReferralPage.getInitialProps = async ctx => {
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

export default ReferralPage;
