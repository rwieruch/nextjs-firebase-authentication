import React from 'react';
import Link from 'next/link';
import { Menu, Icon } from 'antd';

type ExternalLink = {
  title: string;
  url: string;
};

const MORE_COURSES = [
  { title: 'The Road to React', url: 'https://roadtoreact.com/' },
  {
    title: 'The Road to Firebase',
    url: 'https://roadtofirebase.com/',
  },
  { title: 'The Road to GraphQL', url: 'https://roadtographql.com/' },
  { title: 'The Road to Redux', url: 'https://roadtoredux.com/' },
];

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

    <Menu.Item
      style={{ float: 'right' }}
      onClick={() => alert('clicked')}
    >
      Sign Out
    </Menu.Item>

    <Menu.SubMenu style={{ float: 'right' }} title="Browse">
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
      <Link href="/sign-in">
        <a>Sign In</a>
      </Link>
    </Menu.Item>

    <Menu.SubMenu style={{ float: 'right' }} title="Browse">
      {MORE_COURSES.map(link => (
        <Menu.Item key={link.title}>
          <ExternalCourseLink {...link} />
        </Menu.Item>
      ))}
    </Menu.SubMenu>
  </Menu>
);

type NavigationProps = {
  authUser: any;
};

const Navigation = ({ authUser }: NavigationProps) => (
  <>
    {authUser ? (
      <NavigationAuth></NavigationAuth>
    ) : (
      <NavigationNonAuth></NavigationNonAuth>
    )}
  </>
);

export default Navigation;
