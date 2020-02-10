import React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import { Typography, Layout as AntdLayout, Menu, Icon } from 'antd';

import { UnlockedCourse } from '@generated/client';
import { GET_COURSES } from '@queries/course';
import { Session } from '@typeDefs/session';
import Layout, { Footer } from '@components/Layout';

const { Content, Sider } = AntdLayout;

const StyledContent = styled(Content)`
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

interface DashboardPageProps {
  data: {
    courses: UnlockedCourse[];
  };
}

type NextAuthPage = NextPage<DashboardPageProps> & {
  isAuthorized: (session: Session) => boolean;
};

const DashboardPage: NextAuthPage = ({ data }) => {
  console.log(data);

  const isNoCourses = data.courses.length;

  console.log(data.courses[0].courseId);

  return (
    <Layout noFooter>
      {isNoCourses && (
        <StyledSider>
          <Menu
            mode="inline"
            defaultSelectedKeys={[data.courses[0].sections[0].label]}
          >
            {data.courses[0].sections.map(section => (
              <Menu.Item key={section.label}>
                <span>{section.label}</span>
              </Menu.Item>
            ))}
          </Menu>
        </StyledSider>
      )}

      <StyledInnerLayout>
        <StyledContent>
          {isNoCourses ? (
            <>
              <Typography.Title>Course Dashboard</Typography.Title>
              <Typography.Title>Course Dashboard</Typography.Title>

              <Typography.Title>Course Dashboard</Typography.Title>
              <Typography.Title>Course Dashboard</Typography.Title>
              <Typography.Title>Course Dashboard</Typography.Title>
              <Typography.Title>Course Dashboard</Typography.Title>
              <Typography.Title>Course Dashboard</Typography.Title>
              <Typography.Title>Course Dashboard</Typography.Title>

              <Typography.Title>Course Dashboard</Typography.Title>
              <Typography.Title>Course Dashboard</Typography.Title>
              <Typography.Title>Course Dashboard</Typography.Title>
              <Typography.Title>Course Dashboard</Typography.Title>
              <Typography.Title>Course Dashboard</Typography.Title>
              <Typography.Title>Course Dashboard</Typography.Title>

              <Typography.Title>Course Dashboard</Typography.Title>
              <Typography.Title>Course Dashboard</Typography.Title>
              <Typography.Title>Course Dashboard</Typography.Title>
              <Typography.Title>Course Dashboard</Typography.Title>
            </>
          ) : (
            <p>
              You have to buy a course first before seeing it here.
            </p>
          )}
        </StyledContent>
        <Footer />
      </StyledInnerLayout>
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
    query: GET_COURSES,
    ...(isServer && context),
  });

  return { data };
};

export default DashboardPage;
