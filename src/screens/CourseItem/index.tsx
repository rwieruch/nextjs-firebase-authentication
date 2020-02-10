import React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import { Typography, Layout as AntdLayout, Menu, Icon } from 'antd';

import { UnlockedCourse } from '@generated/client';
import { Session } from '@typeDefs/session';
import { GET_UNLOCKED_COURSE } from '@queries/course';
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
    unlockedCourse: UnlockedCourse;
  };
}

type NextAuthPage = NextPage<CourseItemPageProps> & {
  isAuthorized: (session: Session) => boolean;
};

const CourseItemPage: NextAuthPage = ({ data }) => {
  if (!data.unlockedCourse) {
    return null;
  }

  console.log(data.unlockedCourse);

  return (
    <Layout noFooter>
      <StyledSider>
        <Menu
          mode="inline"
          defaultSelectedKeys={[
            data.unlockedCourse?.sections[0].label || '0',
          ]}
        >
          {data.unlockedCourse?.sections.map(section => (
            <Menu.Item key={section.label}>
              <span>{section.label}</span>
            </Menu.Item>
          ))}
        </Menu>
      </StyledSider>

      <StyledInnerLayout>
        <>
          <StyledInnerContent>
            <Typography.Title>Course Dashboard</Typography.Title>
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

  const courseId = kebabCaseToUpperSnakeCase(
    ctx.query['unlocked-course-id'].toString()
  );

  const { data } = await ctx.apolloClient.query({
    fetchPolicy: 'network-only',
    query: GET_UNLOCKED_COURSE,
    variables: {
      courseId,
    },
    ...(isServer && context),
  });

  return { data };
};

export default CourseItemPage;
