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

interface CourseListPageProps {
  unlockedCoursesData: {
    unlockedCourses: UnlockedCourse[];
  };
  storefrontCoursesData: {
    storefrontCourses: StorefrontCourse[];
  };
}

type NextAuthPage = NextPage<CourseListPageProps> & {
  isAuthorized: (session: Session) => boolean;
};

const CourseListPage: NextAuthPage = ({
  unlockedCoursesData,
  storefrontCoursesData,
}) => {
  const isUnlocked = (storefrontCourse: StorefrontCourse) =>
    !unlockedCoursesData.unlockedCourses
      .map(unlockedCourse => unlockedCourse.courseId)
      .includes(storefrontCourse.courseId);

  return (
    <Layout>
      <StyledContent>
        <StyledCards>
          {unlockedCoursesData.unlockedCourses.map(course => {
            let actions = [
              <Link
                href={ROUTES.UNLOCKED_COURSE_DETAILS}
                as={`/p/${upperSnakeCaseToKebabCase(
                  course.courseId
                )}`}
              >
                <a>
                  <Icon type="book" key="book" /> Get Started
                </a>
              </Link>,
            ];

            if (course.canUpgrade) {
              actions.push(
                <ExternalLink url={course.url}>
                  <Icon type="unlock" key="unlock" /> Upgrade
                </ExternalLink>
              );
            }

            return (
              <StyledCard
                key={course.courseId}
                cover={<Cover imageUrl={course.imageUrl} />}
                title={course.header}
                actions={actions}
              />
            );
          })}

          {storefrontCoursesData.storefrontCourses
            .filter(isUnlocked)
            .map(storefrontCourse => {
              const actions = [
                <ExternalLink url={storefrontCourse.url}>
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
            })}
        </StyledCards>
      </StyledContent>
    </Layout>
  );
};

CourseListPage.isAuthorized = (session: Session) => true;

CourseListPage.getInitialProps = async ctx => {
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

  const { data: unlockedCoursesData } = await ctx.apolloClient.query({
    fetchPolicy: 'network-only',
    query: GET_UNLOCKED_COURSES,
    ...(isServer && context),
  });

  const {
    data: storefrontCoursesData,
  } = await ctx.apolloClient.query({
    query: GET_STOREFRONT_COURSES,
  });

  return { unlockedCoursesData, storefrontCoursesData };
};

export default CourseListPage;
