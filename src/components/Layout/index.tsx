import React from 'react';
import styled from 'styled-components';
import { Layout as AntdLayoutBase } from 'antd';

import Navigation from '@components/Navigation';

// height of Menu is 48px
const AntdLayout = styled(AntdLayoutBase)`
  min-height: calc(100vh - 48px);
`;

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <>
    <Navigation />
    <AntdLayout>{children}</AntdLayout>
  </>
);

export default Layout;
