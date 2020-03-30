import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import styled from 'styled-components';
import { Card, Layout as AntdLayout, Breadcrumb } from 'antd';

import * as ROUTES from '@constants/routes';
import * as ROLES from '@constants/roles';
import { User, StorefrontCourse } from '@generated/client';
import { GET_ME } from '@queries/user';
import { Session } from '@typeDefs/session';
import Layout from '@components/Layout';

import Faq from './Faq';
import GetStarted from './GetStarted';
import Visitors from './Visitors';
import Sales from './Sales';
import Assets from './Assets';

const getTabs = (isPartner: boolean) => {
  let tabs = [
    {
      key: 'tab1',
      tab: 'FAQ',
    },
    {
      key: 'tab2',
      tab: 'Get Started',
    },
  ];

  if (isPartner) {
    tabs = tabs.concat([
      {
        key: 'tab3',
        tab: 'Visitors',
      },
      {
        key: 'tab4',
        tab: 'Sales',
      },
      {
        key: 'tab5',
        tab: 'Assets',
      },
    ]);
  }

  return tabs;
};

const getTabsContent = (
  me: User,
  isPartner: boolean
): { [key: string]: React.ReactNode } => ({
  tab1: <Faq me={me} />,
  tab2: <GetStarted me={me} isPartner={isPartner} />,
  tab3: <Visitors me={me} isPartner={isPartner} />,
  tab4: <Sales me={me} isPartner={isPartner} />,
  tab5: <Assets isPartner={isPartner} />,
});

const StyledContent = styled(AntdLayout.Content)`
  margin: calc(56px + 32px) 32px 32px;
`;

const StyledCard = styled(Card)`
  &:not(:first-of-type) {
    margin-top: 16px;
  }
`;

interface PartnerPageeProps {
  data: {
    me: User;
  };
}

type NextAuthPage = NextPage<PartnerPageeProps> & {
  isAuthorized: (session: Session) => boolean;
};

const PartnerPage: NextAuthPage = ({ data }) => {
  const [tab, setTab] = React.useState('tab1');

  const handleTabChange = (key: string) => {
    setTab(key);
  };

  const isPartner = data.me.roles.includes(ROLES.PARTNER);

  return (
    <Layout>
      <StyledContent>
        <Breadcrumb style={{ flex: '0', margin: '16px 0' }}>
          <Breadcrumb.Item>
            <Link href={ROUTES.ACCOUNT}>
              <a>Account</a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Partner Program</Breadcrumb.Item>
        </Breadcrumb>

        <StyledCard
          tabList={getTabs(isPartner)}
          activeTabKey={tab}
          onTabChange={handleTabChange}
        >
          {getTabsContent(data.me, isPartner)[tab]}
        </StyledCard>
      </StyledContent>
    </Layout>
  );
};

PartnerPage.isAuthorized = (session: Session) => !!session;

PartnerPage.getInitialProps = async ctx => {
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

export default PartnerPage;
