import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Menu, Icon } from 'antd';

import * as ROUTES from '@constants/routes';
import SessionContext from '@context/session';

import { ExternalLink } from './types';
import { MORE_COURSES } from './constants';
import signOut from './signOut';

const Container = styled.nav`
  ul {
    padding: 8px 32px 0;
  }
`;

const ExternalCourseLink = ({ title, url }: ExternalLink) => (
  <a href={url} target="_blank" rel="noopener noreferrer">
    {title}
  </a>
);

const Navigation = () => {
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
            <a>
              <img height="40" src="/logo.svg" alt="logo" />
            </a>
          </Link>
        </Menu.Item>

        {!session && (
          <Menu.Item style={{ float: 'right' }}>
            <Link href={ROUTES.SIGN_IN}>
              <a>Sign In</a>
            </Link>
          </Menu.Item>
        )}

        {session && (
          <Menu.SubMenu style={{ float: 'right' }} title="Home">
            <Menu.Item key="0">
              <Link href={ROUTES.ACCOUNT}>
                <a>
                  <Icon type="user" />
                  Account
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="1" onClick={() => signOut()}>
              <Icon type="poweroff" />
              Sign Out
            </Menu.Item>
          </Menu.SubMenu>
        )}

        {!session && (
          <Menu.SubMenu style={{ float: 'right' }} title="Courses">
            {MORE_COURSES.map(link => (
              <Menu.Item key={link.title}>
                <ExternalCourseLink {...link} />
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        )}

        {session && (
          <Menu.SubMenu style={{ float: 'right' }} title="Courses">
            <Menu.ItemGroup key="0" title="My Courses">
              <Menu.Item>
                <Link href={ROUTES.INDEX}>
                  <a>Get Started</a>
                </Link>
              </Menu.Item>
            </Menu.ItemGroup>

            <Menu.ItemGroup key="1" title="More Courses">
              {MORE_COURSES.map(link => (
                <Menu.Item key={link.title}>
                  <ExternalCourseLink {...link} />
                </Menu.Item>
              ))}
            </Menu.ItemGroup>
          </Menu.SubMenu>
        )}
      </Menu>
    </Container>
  );
};

export default Navigation;
