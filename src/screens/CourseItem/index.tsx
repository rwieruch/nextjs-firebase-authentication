import React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import { Layout as AntdLayout, Breadcrumb, Menu, Icon } from 'antd';

import { UnlockedCourse } from '@generated/client';
import { Session } from '@typeDefs/session';
import * as ROUTES from '@constants/routes';
import { GET_UNLOCKED_COURSE } from '@queries/course';
import Layout from '@components/Layout';
import Link from '@components/Link';
import {
  kebabCaseToUpperSnakeCase,
  upperSnakeCaseToKebabCase,
} from '@services/format';

import Introduction from './Introduction';
import Onboarding from './Onboarding';
import BookDownload from './BookDownload';
import BookOnline from './BookOnline';
import Curriculum from './Curriculum';

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
  const [s, setSelected] = React.useState({
    k: 'introduction',
    i: 0,
    j: 0,
  });

  const sKey = `${s.k}:${s.i}:${s.j}`;

  if (!data.unlockedCourse) {
    return null;
  }

  const handleSelectSection = (k: string, i: number, j: number) => {
    window.scrollTo(0, 0);

    setSelected({ k, i, j });
  };

  const {
    courseId,
    header,
    canUpgrade,
    introduction,
    onboarding,
    bookDownload,
    bookOnline,
    curriculum,
  } = data.unlockedCourse;

  const introductionData = introduction?.data;
  const onboardingData = onboarding?.data;
  const bookDownloadData = bookDownload?.data;
  const bookOnlineData = bookOnline?.data;
  const curriculumData = curriculum?.data;

  return (
    <Layout>
      <StyledContent>
        <Breadcrumb style={{ flex: '0', margin: '16px 0' }}>
          <Breadcrumb.Item>
            <Link href={ROUTES.INDEX}>Courses</Link>
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
            width={250}
            style={{
              background: '#fff',
              overflow: 'auto',
              position: 'sticky',
              left: 0,
            }}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={[sKey]}
              style={{ height: '100%' }}
            >
              {introduction && (
                <Menu.Item
                  key="introduction:0:0"
                  disabled={!introductionData}
                  onClick={() =>
                    handleSelectSection('introduction', 0, 0)
                  }
                >
                  <span>{introduction.label}</span>
                </Menu.Item>
              )}

              {onboarding && (
                <Menu.Item
                  key="onboarding:0:0"
                  disabled={!onboardingData}
                  onClick={() =>
                    handleSelectSection('onboarding', 0, 0)
                  }
                >
                  <span>{onboarding.label}</span>
                </Menu.Item>
              )}

              {bookDownload && (
                <Menu.Item
                  key="bookDownload:0:0"
                  disabled={!bookDownloadData}
                  onClick={() =>
                    handleSelectSection('bookDownload', 0, 0)
                  }
                >
                  <span>{bookDownload.label}</span>
                </Menu.Item>
              )}

              {bookOnline && (
                <Menu.SubMenu
                  title={bookOnline.label}
                  disabled={!bookOnlineData}
                >
                  {bookOnline.data?.chapters.map((chapter, i) => {
                    if (chapter.sections) {
                      return (
                        <Menu.SubMenu
                          key={`bookOnline:${i}`}
                          title={chapter.label}
                        >
                          {chapter.sections.map((section, j) => (
                            <Menu.Item
                              key={`bookOnline:${i}:${j}`}
                              onClick={() =>
                                handleSelectSection(
                                  'bookOnline:section',
                                  i,
                                  j
                                )
                              }
                            >
                              {section.label}
                            </Menu.Item>
                          ))}
                        </Menu.SubMenu>
                      );
                    } else {
                      return (
                        <Menu.Item
                          key={`bookOnline:${i}:${0}`}
                          onClick={() =>
                            handleSelectSection(
                              'bookOnline:chapter',
                              i,
                              0
                            )
                          }
                        >
                          {chapter.label}
                        </Menu.Item>
                      );
                    }
                  })}
                </Menu.SubMenu>
              )}

              {curriculum && (
                <Menu.SubMenu
                  title={curriculum.label}
                  disabled={!curriculumData}
                >
                  {curriculum.data?.sections.map((curricu, i) => (
                    <Menu.Item
                      key={`curriculum:${i}:0`}
                      onClick={() =>
                        handleSelectSection(`curriculum`, i, 0)
                      }
                    >
                      {curricu.label}
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              )}

              {canUpgrade && (
                <Menu.Item key="upgrade">
                  <Link
                    href={ROUTES.COURSE_UPGRADE}
                    as={`/upgrade/${upperSnakeCaseToKebabCase(
                      courseId
                    )}`}
                  >
                    <Icon type="fire" /> Upgrade
                  </Link>
                </Menu.Item>
              )}
            </Menu>
          </Sider>

          <Content style={{ padding: '0 24px' }}>
            {s.k === 'introduction' && introductionData && (
              <Introduction introductionData={introductionData} />
            )}

            {s.k === 'onboarding' && onboardingData && (
              <Onboarding onboardingData={onboardingData} />
            )}

            {s.k === 'bookDownload' && bookDownloadData && (
              <BookDownload bookDownloadData={bookDownloadData} />
            )}

            {s.k === 'bookOnline:section' && bookOnlineData && (
              <BookOnline
                path={
                  bookOnlineData.chapters[s.i].sections?.[s.j].url
                }
              />
            )}

            {s.k === 'bookOnline:chapter' && bookOnlineData && (
              <BookOnline path={bookOnlineData.chapters[s.i].url} />
            )}

            {s.k === 'curriculum' && curriculumData && (
              <Curriculum
                curriculumSection={curriculumData.sections[s.i]}
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
