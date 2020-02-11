import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import styled from 'styled-components';
import { Layout as AntdLayout, Breadcrumb, Menu } from 'antd';

import { UnlockedCourse } from '@generated/client';
import { Session } from '@typeDefs/session';
import * as ROUTES from '@constants/routes';
import { GET_UNLOCKED_COURSE } from '@queries/course';
import Layout from '@components/Layout';
import { kebabCaseToUpperSnakeCase } from '@services/string';

import CourseSection from './CourseSection';

const { Content, Sider } = AntdLayout;

const StyledContent = styled(Content)`
  margin: calc(56px) 32px 0px;

  display: flex;
  flex-direction: column;
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
  const [selectedSection, setSelectedSection] = React.useState(0);

  if (!data.unlockedCourse) {
    return null;
  }

  const handleSelectSection = (index: number) => {
    setSelectedSection(index);
  };

  console.log(data.unlockedCourse);

  return (
    <Layout>
      <StyledContent>
        <Breadcrumb style={{ flex: '0', margin: '16px 0' }}>
          <Breadcrumb.Item>
            <Link href={ROUTES.INDEX}>
              <a>Courses</a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            {data.unlockedCourse.header}
          </Breadcrumb.Item>
        </Breadcrumb>
        <AntdLayout
          style={{
            flex: '1',
            padding: '24px 0',
            background: '#fff',
          }}
        >
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={[selectedSection.toString()]}
              style={{ height: '100%' }}
            >
              {data.unlockedCourse?.sections.map((section, index) => (
                <Menu.Item
                  key={index}
                  onClick={() => handleSelectSection(index)}
                >
                  <span>{section.label}</span>
                </Menu.Item>
              ))}
            </Menu>
          </Sider>

          <Content style={{ padding: '0 24px' }}>
            <CourseSection
              section={data.unlockedCourse?.sections[selectedSection]}
            />
          </Content>
        </AntdLayout>
      </StyledContent>
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
