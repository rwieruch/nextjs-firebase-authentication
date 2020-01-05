import React from 'react';

import Navigation from '@components/Navigation';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <>
    <Navigation />
    {children}
  </>
);

export default Layout;
