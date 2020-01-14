import React from 'react';
import styled from 'styled-components';
import { Layout as MyLayout } from 'antd';

const { Header, Content, Footer, Sider } = MyLayout;

import Navigation from '@components/Navigation';

// heights:
// Menu 48px;
// Menu Padding 8px;
// Footer 70px;
const StyledContent = styled(Content)`
  min-height: calc(100vh - 48px - 8px - 70px);

  display: flex;
  flex-direction: row;

  div {
    flex: 1;
  }
`;

const StyledFooter = styled(Footer)`
  text-align: center;
`;

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <MyLayout>
    <header>
      <Navigation />
    </header>

    <StyledContent>{children}</StyledContent>

    <StyledFooter>
      Created by{' '}
      <a href="https://www.robinwieruch.de/">Robin Wieruch</a>
    </StyledFooter>
  </MyLayout>
);

export default Layout;
