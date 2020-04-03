import React from 'react';
import styled from 'styled-components';
import { Menu, Icon } from 'antd';

import { useApolloClient } from '@apollo/react-hooks';
import * as ROUTES from '@constants/routes';
import SessionContext from '@context/session';
import Link from '@components/Link';

import signOut from './signOut';

const Container = styled.nav`
  ul {
    padding-top: 8px;
    padding: bottom: 0px;
    padding-left: 30px;
    padding-right: 32px;
  }
`;

const Navigation = () => {
  const apolloClient = useApolloClient();
  const session = React.useContext(SessionContext);

  return (
    <Container>
      <Menu mode="horizontal">
        <Menu.Item
          style={{
            float: 'left',
            borderBottom: '2px solid transparent',
          }}
        >
          <Link href="/">
            <img height="40" src="/logo.svg" alt="logo" />
          </Link>
        </Menu.Item>

        {!session && (
          <Menu.Item style={{ float: 'right' }}>
            <Link href={ROUTES.SIGN_IN}>Sign In</Link>
          </Menu.Item>
        )}

        {session && (
          <Menu.SubMenu style={{ float: 'right' }} title="Home">
            <Menu.Item key="0">
              <Link href={ROUTES.ACCOUNT}>
                <Icon type="user" />
                Account
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link href={ROUTES.COMMUNITY_JOIN}>
                <Icon type="notification" />
                Join Community
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link href={ROUTES.PARTNER}>
                <Icon type="coffee" />
                Partner Program
              </Link>
            </Menu.Item>
            <Menu.Item
              key="4"
              onClick={() =>
                signOut(undefined, undefined, apolloClient)
              }
            >
              <Icon type="poweroff" />
              Sign Out
            </Menu.Item>
          </Menu.SubMenu>
        )}

        <Menu.Item style={{ float: 'right' }}>
          <Link href={ROUTES.INDEX}>Courses</Link>
        </Menu.Item>
      </Menu>
    </Container>
  );
};

export default Navigation;
