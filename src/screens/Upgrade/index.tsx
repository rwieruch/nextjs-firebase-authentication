import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import styled from 'styled-components';
import { Layout as AntdLayout, Card, Icon } from 'antd';

import * as ROUTES from '@constants/routes';
import { upperSnakeCaseToKebabCase } from '@services/string';
import { UnlockedCourse, StorefrontCourse } from '@generated/client';
import { GET_UNLOCKED_COURSES } from '@queries/course';
import { GET_STOREFRONT_COURSES } from '@queries/storefront';
import { Session } from '@typeDefs/session';
import Layout from '@components/Layout';
import ExternalLink from '@components/ExternalLink';

const { Content } = AntdLayout;

const StyledContent = styled(Content)`
  margin: calc(56px + 32px) 32px 32px;
`;

const StyledCard = styled(Card)`
  min-width: 200px;
  max-width: 300px;

  .ant-card-body {
    padding: 8px;
  }
`;

const StyledCards = styled.div`
  margin: 16px;

  display: grid;
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(200px, 300px));
  grid-gap: 16px;
`;

type CoverProps = {
  imageUrl: string | null | undefined;
};

const Cover = ({ imageUrl }: CoverProps) => (
  <img
    style={{ padding: '16px 64px 0' }}
    alt="cover"
    src={imageUrl || ''}
  />
);

interface UpgradePageProps {
  storefrontCoursesData: {
    storefrontCourses: StorefrontCourse[];
  };
}

type NextAuthPage = NextPage<UpgradePageProps> & {
  isAuthorized: (session: Session) => boolean;
};

const UpgradePage: NextAuthPage = ({ storefrontCoursesData }) => {
  return (
    <Layout>
      <StyledContent>
        <StyledCards>
          {storefrontCoursesData.storefrontCourses.map(
            storefrontCourse => {
              const actions = [
                <ExternalLink href={storefrontCourse.url}>
                  <Icon type="unlock" key="unlock" /> Unlock Course
                </ExternalLink>,
              ];

              return (
                <StyledCard
                  key={storefrontCourse.courseId}
                  cover={
                    <Cover imageUrl={storefrontCourse.imageUrl} />
                  }
                  title={storefrontCourse.header}
                  actions={actions}
                />
              );
            }
          )}
        </StyledCards>
      </StyledContent>
    </Layout>
  );
};

UpgradePage.isAuthorized = (session: Session) => !!session;

UpgradePage.getInitialProps = async ctx => {
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

  const {
    data: storefrontCoursesData,
  } = await ctx.apolloClient.query({
    query: GET_STOREFRONT_COURSES,
    ...(isServer && context),
  });

  return { storefrontCoursesData };
};

export default UpgradePage;
