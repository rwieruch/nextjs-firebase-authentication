import React from 'react';
import styled from 'styled-components';
import { Typography, Card, Layout as AntdLayout } from 'antd';

import { Session } from '@typeDefs/session';
import Layout from '@components/Layout';

const tabList = [
  {
    key: 'tab1',
    tab: 'tab1',
  },
  {
    key: 'tab2',
    tab: 'tab2',
  },
];

const contentList: { [key: string]: React.ReactNode } = {
  tab1: <p>content1</p>,
  tab2: <p>content2</p>,
};

const StyledContent = styled(AntdLayout.Content)`
  margin: calc(56px + 32px) 32px 32px;
`;

const StyledCard = styled(Card)`
  &:not(:first-of-type) {
    margin-top: 16px;
  }
`;

const ReferralPage = () => {
  const [tab, setTab] = React.useState('tab1');

  const handleTabChange = (key: string) => {
    setTab(key);
  };

  return (
    <Layout>
      <StyledContent>
        <Typography.Title>Referral Program</Typography.Title>
        <StyledCard
          title="Referrer Dashboard"
          tabList={tabList}
          activeTabKey={tab}
          onTabChange={handleTabChange}
        >
          {contentList[tab]}
        </StyledCard>
      </StyledContent>
    </Layout>
  );
};

ReferralPage.isAuthorized = (session: Session) => !!session;

export default ReferralPage;
