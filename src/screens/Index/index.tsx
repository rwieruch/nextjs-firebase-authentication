import React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import { Typography, Layout as AntdLayout, Menu, Icon } from 'antd';
import gql from 'graphql-tag';

const { Content, Sider } = AntdLayout;

import { GetMe } from '@generated/GetMe';
import { Session } from '@typeDefs/session';
import Layout, { Footer } from '@components/Layout';

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
  data: GetMe;
}

type NextAuthPage = NextPage<DashboardPageProps> & {
  isAuthorized: (session: Session) => boolean;
};

const DashboardPage: NextAuthPage = ({ data }) => {
  return (
    <Layout noFooter>
      <StyledSider>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="user" />
                subnav 1
              </span>
            }
          >
            <Menu.Item key="1">option1</Menu.Item>
            <Menu.Item key="2">option2</Menu.Item>
            <Menu.Item key="3">option3</Menu.Item>
            <Menu.Item key="4">option4</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="laptop" />
                subnav 2
              </span>
            }
          >
            <Menu.Item key="5">option5</Menu.Item>
            <Menu.Item key="6">option6</Menu.Item>
            <Menu.Item key="7">option7</Menu.Item>
            <Menu.Item key="8">option8</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu
            key="sub3"
            title={
              <span>
                <Icon type="notification" />
                subnav 3
              </span>
            }
          >
            <Menu.Item key="9">option9</Menu.Item>
            <Menu.Item key="10">option10</Menu.Item>
            <Menu.Item key="11">option11</Menu.Item>
            <Menu.Item key="12">option12</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="laptop" />
                subnav 2
              </span>
            }
          >
            <Menu.Item key="5">option5</Menu.Item>
            <Menu.Item key="6">option6</Menu.Item>
            <Menu.Item key="7">option7</Menu.Item>
            <Menu.Item key="8">option8</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="laptop" />
                subnav 2
              </span>
            }
          >
            <Menu.Item key="5">option5</Menu.Item>
            <Menu.Item key="6">option6</Menu.Item>
            <Menu.Item key="7">option7</Menu.Item>
            <Menu.Item key="8">option8</Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </StyledSider>

      <StyledInnerLayout>
        <StyledContent>
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
    query: gql`
      query GetMe {
        me {
          email
        }
      }
    `,
    ...(isServer && context),
  });

  return { data };
};

export default DashboardPage;
