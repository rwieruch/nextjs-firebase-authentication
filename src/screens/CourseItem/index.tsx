import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Typography, Layout as AntdLayout, Menu, Icon } from 'antd';

import * as ROUTES from '@constants/routes';
import { UnlockedCourse } from '@generated/client';
import { Session } from '@typeDefs/session';
import { GET_UNLOCKED_COURSES } from '@queries/course';
import Layout, { Footer } from '@components/Layout';
import { kebabCaseToUpperSnakeCase } from '@services/string';

const { Content, Sider } = AntdLayout;

const StyledContent = styled(Content)`
  margin: calc(56px + 32px) 32px 32px;
`;

const StyledInnerContent = styled(Content)`
  margin: 32px;
`;

const StyledSider = styled(Sider)`
  overflow: auto;
  height: 100vh;
  width: 200px;
  background: #fff;
  position: fixed;
  top: 56px;
`;

const StyledInnerLayout = styled(AntdLayout)`
  margin-left: 200px;
  margin-top: 56px;
`;

interface CourseItemPageProps {
  data: {
    unlockedCourses: UnlockedCourse[];
  };
}

type NextAuthPage = NextPage<CourseItemPageProps> & {
  isAuthorized: (session: Session) => boolean;
};

const CourseItemPage: NextAuthPage = ({ data }) => {
  const router = useRouter();

  const course = data.unlockedCourses.find(
    course =>
      course.courseId ===
      kebabCaseToUpperSnakeCase(
        router.query['unlocked-course-id']?.toString() || ''
      )
  );

  const isNoCourses = !course;

  if (isNoCourses) {
    return (
      <Layout>
        <StyledContent>
          <p>
            Couldn't find any purchased course under this url. Head{' '}
            <Link href={ROUTES.INDEX}>
              <a>back</a>
            </Link>{' '}
            to see all your courses.
          </p>
        </StyledContent>
      </Layout>
    );
  }

  return (
    <Layout noFooter>
      <StyledSider>
        <Menu
          mode="inline"
          defaultSelectedKeys={[course?.sections[0].label || '0']}
        >
          {course?.sections.map(section => (
            <Menu.Item key={section.label}>
              <span>{section.label}</span>
            </Menu.Item>
          ))}
        </Menu>
      </StyledSider>

      <StyledInnerLayout>
        <>
          <StyledInnerContent>
            {!isNoCourses ? (
              <>
                <Typography.Title>Course Dashboard</Typography.Title>
              </>
            ) : (
              <p>
                You have to buy a course first before seeing it here.
              </p>
            )}
          </StyledInnerContent>
          <Footer />
        </>
      </StyledInnerLayout>
    </Layout>
  );
};

CourseItemPage.isAuthorized = (session: Session) => !!session;

CourseItemPage.getInitialProps = async ctx => {
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
    fetchPolicy: 'network-only',
    query: GET_UNLOCKED_COURSES,
    ...(isServer && context),
  });

  return { data };
};

export default CourseItemPage;
