import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import styled from 'styled-components';
import { Layout as AntdLayout, Card, Icon } from 'antd';

import * as ROUTES from '@constants/routes';
import { StorefrontCourse } from '@generated/client';
import { GET_UPGRADEABLE_COURSES } from '@queries/upgrade';
import { Session } from '@typeDefs/session';
import Layout from '@components/Layout';
import {
  formatPricem,
  kebabCaseToUpperSnakeCase,
} from '@services/format';

const { Content } = AntdLayout;

const StyledContent = styled(Content)`
  margin: calc(56px + 32px) 32px 32px;
`;

const StyledCard = styled(Card)`
  min-width: 250px;
  max-width: 350px;

  .ant-card-body {
    padding: 8px;
  }
`;

const StyledCards = styled.div`
  margin: 16px;

  display: grid;
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(250px, 350px));
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
  upgradeableCoursesData: {
    upgradeableCourses: StorefrontCourse[];
  };
}

type NextAuthPage = NextPage<UpgradePageProps> & {
  isAuthorized: (session: Session) => boolean;
};

const UpgradePage: NextAuthPage = ({ upgradeableCoursesData }) => {
  return (
    <Layout>
      <StyledContent>
        <StyledCards>
          {upgradeableCoursesData.upgradeableCourses.map(
            storefrontCourse => {
              const actions = [
                <Link
                  href={`${ROUTES.CHECKOUT}?courseId=${storefrontCourse.courseId}&bundleId=${storefrontCourse.bundle.bundleId}&coupon=${storefrontCourse.bundle.bundleId}_UPGRADE`}
                >
                  <a>
                    <Icon type="fire" key="unlock" /> Upgrade
                    for&nbsp;
                    {formatPrice(storefrontCourse.bundle.price)}
                  </a>
                </Link>,
              ];

              return (
                <StyledCard
                  key={storefrontCourse.courseId}
                  cover={
                    <Cover
                      imageUrl={storefrontCourse.bundle.imageUrl}
                    />
                  }
                  title={`${storefrontCourse.header} - ${storefrontCourse.bundle.header}`}
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

  const courseId = kebabCaseToUpperSnakeCase(
    ctx.query['upgradeable-course-id'].toString()
  );

  const {
    data: upgradeableCoursesData,
  } = await ctx.apolloClient.query({
    query: GET_UPGRADEABLE_COURSES,
    variables: {
      courseId,
    },
    ...(isServer && context),
  });

  return { upgradeableCoursesData };
};

export default UpgradePage;
