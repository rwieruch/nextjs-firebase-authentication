import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import styled from 'styled-components';
import { Card, Layout as AntdLayout, Breadcrumb } from 'antd';

import * as ROUTES from '@constants/routes';
import * as ROLES from '@constants/roles';
import { User } from '@generated/client';
import { GET_ME } from '@queries/user';
import { Session } from '@typeDefs/session';
import Layout from '@components/Layout';

const tabList = [
  {
    key: 'tab1',
    tab: 'FAQ',
  },
  {
    key: 'tab2',
    tab: 'Get Started',
  },
  {
    key: 'tab3',
    tab: 'Dashboard',
  },
  {
    key: 'tab4',
    tab: 'Assets',
  },
];

const getContentList = (
  me: User
): { [key: string]: React.ReactNode } => {
  const isPartner = me.roles.includes(ROLES.PARTNER);
  const generalPartnerLink =
    typeof window !== 'undefined'
      ? `${window.location.origin}?partnerId=${me.uid}`
      : '';

  return {
    tab1: (
      <ul>
        <li>
          <strong>What's the partner program?</strong>
          <p>
            Partners of this website earn a commission whenever they
            send traffic to this website that results in a payment.
          </p>
        </li>
        <li>
          <strong>How much does a partner earn?</strong>
          <p>
            Partners earn 50% (excl. the transaction costs from credit
            card etc.) from the net amount of each succesful payment.
          </p>
        </li>
        <li>
          <strong>Can everyone become a partner?</strong>
          <p>
            The seats for partners are limited. If you have an
            audience (e.g. social media) or platform (e.g. blog) for
            people interested in the topics taught on this website,
            you are welcome to apply for the partner program.
          </p>
        </li>
        <li>
          <strong>How do I apply as partner?</strong>
          <p>
            If the above applies to you, please{' '}
            <a href="mailto:hello@rwieruch.com">contact me</a> with
            your details which should include some words about
            yourself, your email <em>{me.email}</em>, estimated
            traffic, and one or more URL(s) to your website, blog,
            newsletter, social media or anything else related to it.
          </p>
        </li>
      </ul>
    ),
    tab2: (
      <ul>
        <li>
          <strong>Am I a partner?</strong>
          <p>
            {isPartner
              ? 'Yes. You can get started here.'
              : 'Not yet, please check the FAQ if you want to apply.'}
          </p>
        </li>

        {isPartner && (
          <>
            <li>
              <strong>What's my partner ID?</strong>
              <p>{me.uid}</p>
            </li>

            <li>
              <strong>
                How do I refer to this website as a partner?
              </strong>
              <p>
                If you want to refer to this website, use{' '}
                <em>{generalPartnerLink}</em> as referral link. It's
                important that your partner ID is set as{' '}
                <em>partnerId</em> query parameter in the URL.
              </p>
            </li>

            <li>
              <strong>How does it work?</strong>
              <p>
                Every time a user visits this website via your
                referral link and happens to buy something, it will be
                recorded as a referral payment on your Dashboard. If
                the user allows the usage of the browser's storage,
                the first referral link will work over more than one
                browser session.
              </p>
            </li>
            <li>
              <strong>
                How can I verify that may referral link works?
              </strong>
              <p>
                Check your Dashboard for the <em>Times Visited</em>{' '}
                property.
              </p>
            </li>
            <li>
              <strong>When can I expect my payment?</strong>
              <p>
                The payment will happen at the end of every month.
              </p>
            </li>
          </>
        )}
      </ul>
    ),
    tab3: <p>Times Visited</p>,
    tab4: <p>content2</p>,
  };
};

const StyledContent = styled(AntdLayout.Content)`
  margin: calc(56px + 32px) 32px 32px;
`;

const StyledCard = styled(Card)`
  &:not(:first-of-type) {
    margin-top: 16px;
  }
`;

interface PartnerPageeProps {
  data: {
    me: User;
  };
}

type NextAuthPage = NextPage<PartnerPageeProps> & {
  isAuthorized: (session: Session) => boolean;
};

const PartnerPage: NextAuthPage = ({ data }) => {
  console.log(data.me);

  const [tab, setTab] = React.useState('tab1');

  const handleTabChange = (key: string) => {
    setTab(key);
  };

  return (
    <Layout>
      <StyledContent>
        <Breadcrumb style={{ flex: '0', margin: '16px 0' }}>
          <Breadcrumb.Item>
            <Link href={ROUTES.ACCOUNT}>
              <a>Account</a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Partner Program</Breadcrumb.Item>
        </Breadcrumb>

        <StyledCard
          tabList={tabList}
          activeTabKey={tab}
          onTabChange={handleTabChange}
        >
          {getContentList(data.me)[tab]}
        </StyledCard>
      </StyledContent>
    </Layout>
  );
};

PartnerPage.isAuthorized = (session: Session) => !!session;

PartnerPage.getInitialProps = async ctx => {
  const isServer = ctx.req || ctx.res;

  const context = isServer
    ? {
        context: {
          headers: {
            cookie: ctx?.req?.headers.cookie,
          },
        },
      }
    : null;

  const { data } = await ctx.apolloClient.query({
    query: GET_ME,
    ...(isServer && context),
  });

  return { data };
};

export default PartnerPage;
