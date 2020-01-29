import React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import { Layout as AntdLayout } from 'antd';

import { GetStorefront } from '@generated/GetStorefront';
import { Session } from '@typeDefs/session';
import Layout from '@components/Layout';

import CheckoutWizard from './CheckoutWizard';

const StyledContent = styled(AntdLayout.Content)`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 56px;
`;

interface CheckoutPageProps {
  data: GetStorefront;
}

type NextAuthPage = NextPage<CheckoutPageProps> & {
  isAuthorized: (session: Session) => boolean;
};

const CheckoutPage: NextAuthPage = ({ data }) => {
  const router = useRouter();

  const { imageUrl } = router.query;

  return (
    <Layout>
      <StyledContent>
        <CheckoutWizard
          data={data}
          imageUrl={
            // TODO weird
            imageUrl instanceof Array ? imageUrl.join('') : imageUrl
          }
        />
      </StyledContent>
    </Layout>
  );
};

CheckoutPage.isAuthorized = (session: Session) => true;

CheckoutPage.getInitialProps = async ctx => {
  const { courseId, bundleId } = ctx.query;

  const { data } = await ctx.apolloClient.query({
    query: gql`
      query GetStorefront($courseId: String, $bundleId: String) {
        storefront(courseId: $courseId, bundleId: $bundleId) {
          course {
            header
            courseId
            bundle {
              header
              bundleId
              price
            }
          }
        }
      }
    `,
    variables: {
      courseId,
      bundleId,
    },
  });

  return { data };
};

export default CheckoutPage;
