import React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import { Card, Layout as AntdLayout } from 'antd';

import { User } from '@generated/client';
import { GET_ME } from '@queries/user';
import { Session } from '@typeDefs/session';
import Layout from '@components/Layout';

import CommunityJoinForm from './CommunityJoinForm';

const StyledContent = styled(AntdLayout.Content)`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 56px;
`;

const StyledCard = styled(Card)`
  min-width: 200px;
  max-width: 400px;
`;

interface CommunityJoinPageeProps {
  data: {
    me: User;
  };
}

type NextAuthPage = NextPage<CommunityJoinPageeProps> & {
  isAuthorized: (session: Session) => boolean;
};

const CommunityJoinPage: NextAuthPage = ({ data }) => {
  return (
    <Layout>
      <StyledContent>
        <StyledCard title="Join the community on Slack">
          <CommunityJoinForm me={data.me} />
        </StyledCard>
      </StyledContent>
    </Layout>
  );
};

CommunityJoinPage.isAuthorized = (session: Session) => !!session;

CommunityJoinPage.getInitialProps = async ctx => {
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

export default CommunityJoinPage;
