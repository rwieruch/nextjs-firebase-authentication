import React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import { Typography, Card } from 'antd';
import gql from 'graphql-tag';

import { GetMe } from '@generated/GetMe';
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

const Container = styled.div`
  margin: 32px;
`;

const StyledCard = styled(Card)`
  &:not(:first-of-type) {
    margin-top: 16px;
  }
`;

interface DashboardPageProps {
  data: GetMe;
}

type NextAuthPage = NextPage<DashboardPageProps> & {
  isAuthorized: (session: Session) => boolean;
};

const DashboardPage: NextAuthPage = ({ data }) => {
  const [tab, setTab] = React.useState('tab1');

  const handleTabChange = (key: string) => {
    setTab(key);
  };

  return (
    <Layout>
      <Container>
        <Typography.Title>Course Dashboard</Typography.Title>
        <StyledCard title="Protected Course X">
          <Card.Grid>Content</Card.Grid>
          <Card.Grid>Content</Card.Grid>
          <Card.Grid>Content</Card.Grid>
          <Card.Grid>Content</Card.Grid>
          <Card.Grid>Content</Card.Grid>
          <Card.Grid>Content</Card.Grid>
          <Card.Grid>Content</Card.Grid>
        </StyledCard>

        <StyledCard
          title="Course Content"
          tabList={tabList}
          activeTabKey={tab}
          onTabChange={handleTabChange}
        >
          {contentList[tab]}
        </StyledCard>
      </Container>
    </Layout>
  );
};

DashboardPage.isAuthorized = (session: Session) => !!session;

DashboardPage.getInitialProps = async ctx => {
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
    query: gql`
      query GetMe {
        me {
          email
        }
      }
    `,
    ...(isServer && context),
  });

  return { data };
};

export default DashboardPage;
