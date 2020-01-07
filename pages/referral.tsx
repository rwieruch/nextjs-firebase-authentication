import React from 'react';
import styled from 'styled-components';
import { Card } from 'antd';

import Layout from '@components/Layout';
import withAuthorization from '@components/Session/withAuthorization';

import { Session } from '@typeDefs/session';

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

const Container = styled.div`
  margin: 32px;
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
      <Container>
        <StyledCard
          title="Referral Program"
          tabList={tabList}
          activeTabKey={tab}
          onTabChange={handleTabChange}
        >
          {contentList[tab]}
        </StyledCard>
      </Container>
    </Layout>
  );
};

const condition = (session: Session): boolean => !!session.authUser;

export default withAuthorization(condition)(ReferralPage);
