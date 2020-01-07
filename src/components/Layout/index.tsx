import React from 'react';
import styled from 'styled-components';
import { Layout as MyLayout } from 'antd';

const { Header, Content, Footer, Sider } = MyLayout;

import Navigation from '@components/Navigation';

// heights: Menu 48px; Menu Padding 8px; Footer 70px;
const MyContent = styled(Content)`
  min-height: calc(100vh - 48px - 8px - 70px);
`;

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <MyLayout>
    <header>
      <Navigation />
    </header>
    <MyContent>{children}</MyContent>
    <Footer style={{ textAlign: 'center' }}>
      ©2020 Created by Robin Wieruch
    </Footer>
  </MyLayout>
);

export default Layout;
