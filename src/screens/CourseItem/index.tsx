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
import BookOnline from './BookOnline';

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
  const [selectedSection, setSelectedSection] = React.useState(
    'introduction'
  );

  if (!data.unlockedCourse) {
    return null;
  }

  const handleSelectSection = (section: string) => {
    setSelectedSection(section);
  };

  console.log(data.unlockedCourse);

  const {
    header,
    introduction,
    onboarding,
    bookDownload,
    bookOnline,
    courseSections,
  } = data.unlockedCourse;

  return (
    <Layout>
      <StyledContent>
        <Breadcrumb style={{ flex: '0', margin: '16px 0' }}>
          <Breadcrumb.Item>
            <Link href={ROUTES.INDEX}>
              <a>Courses</a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{header}</Breadcrumb.Item>
        </Breadcrumb>
        <AntdLayout
          style={{
            flex: '1',
            padding: '24px 0',
            background: '#fff',
          }}
        >
          <Sider
            width={200}
            style={{
              background: '#fff',
              overflow: 'auto',
              height: '100vh',
              position: 'sticky',
              top: '56px',
              left: 0,
            }}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={[selectedSection]}
              style={{ height: '100%' }}
            >
              {introduction && (
                <Menu.Item
                  key="introduction"
                  onClick={() => handleSelectSection('introduction')}
                >
                  <span>{introduction.label}</span>
                </Menu.Item>
              )}

              {onboarding && (
                <Menu.Item
                  key="onboarding"
                  onClick={() => handleSelectSection('onboarding')}
                >
                  <span>{onboarding.label}</span>
                </Menu.Item>
              )}

              {bookDownload && (
                <Menu.Item
                  key="bookDownload"
                  onClick={() => handleSelectSection('bookDownload')}
                >
                  <span>{bookDownload.label}</span>
                </Menu.Item>
              )}

              {bookOnline && (
                <Menu.SubMenu title={bookOnline.label}>
                  {bookOnline.items.map((item, index) => (
                    <Menu.Item
                      key={`bookOnline:${index}`}
                      onClick={() =>
                        handleSelectSection(`bookOnline:${index}`)
                      }
                    >
                      {item.label}
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              )}

              {courseSections && (
                <Menu.SubMenu title="Curriculum">
                  {courseSections.map((courseSection, index) => (
                    <Menu.Item
                      key={`courseSections:${index}`}
                      onClick={() =>
                        handleSelectSection(`courseSections:${index}`)
                      }
                    >
                      {courseSection.label}
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              )}
            </Menu>
          </Sider>

          <Content style={{ padding: '0 24px' }}>
            {selectedSection === 'introduction' && introduction && (
              <CourseSection section={introduction} />
            )}

            {selectedSection === 'onboarding' && onboarding && (
              <CourseSection section={onboarding} />
            )}

            {selectedSection === 'bookDownload' && bookDownload && (
              <CourseSection section={bookDownload} />
            )}

            {selectedSection.includes('bookOnline') && bookOnline && (
              <BookOnline
                path={
                  bookOnline.items[
                    Number(selectedSection.replace('bookOnline:', ''))
                  ]?.url
                }
              />
            )}

            {selectedSection.includes('courseSections') &&
              courseSections && (
                <CourseSection
                  section={
                    courseSections[
                      Number(
                        selectedSection.replace('courseSections:', '')
                      )
                    ]
                  }
                />
              )}
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
