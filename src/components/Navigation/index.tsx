import React from 'react';
import Link from 'next/link';
import { Menu, Icon } from 'antd';

import * as ROUTES from '@constants/routes';
import AuthUserContext from '@context/authUser';
import { doSignOut } from '@services/firebase/auth';

import { ExternalLink } from './types';
import { MORE_COURSES } from './constants';

const ExternalCourseLink = ({ title, url }: ExternalLink) => (
  <a href={url} target="_blank" rel="noopener noreferrer">
    <Icon type="link" />
    {title}
  </a>
);

const NavigationAuth = () => (
  <Menu mode="horizontal">
    {/* <Menu.Item style={{ float: 'left' }}>
      <Link href="/">
        <Icon component={() => <img src="/image.svg" />} />
      </Link>
    </Menu.Item> */}

    <Menu.Item style={{ float: 'right' }} onClick={doSignOut}>
      Sign Out
    </Menu.Item>

    <Menu.SubMenu style={{ float: 'right' }} title="Browse Courses">
      {MORE_COURSES.map(link => (
        <Menu.Item key={link.title}>
          <ExternalCourseLink {...link} />
        </Menu.Item>
      ))}
    </Menu.SubMenu>
  </Menu>
);

const NavigationNonAuth = () => (
  <Menu mode="horizontal">
    {/* <Menu.Item style={{ float: 'left' }}>
      <Link href="/">
        <Icon component={() => <img src="/image.svg" />} />
      </Link>
    </Menu.Item> */}

    <Menu.Item style={{ float: 'right' }}>
      <Link href={ROUTES.SIGN_IN}>
        <a>Sign In</a>
      </Link>
    </Menu.Item>

    <Menu.SubMenu style={{ float: 'right' }} title="Browse Courses">
      {MORE_COURSES.map(link => (
        <Menu.Item key={link.title}>
          <ExternalCourseLink {...link} />
        </Menu.Item>
      ))}
    </Menu.SubMenu>
  </Menu>
);

const Navigation = () => {
  const authUser = React.useContext(AuthUserContext);

  return (
    <>
      {authUser ? (
        <NavigationAuth></NavigationAuth>
      ) : (
        <NavigationNonAuth></NavigationNonAuth>
      )}
    </>
  );
};

export default Navigation;
