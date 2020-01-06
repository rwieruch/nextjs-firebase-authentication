import fetch from 'isomorphic-unfetch';
import { NextApiRequest } from 'next';

import { Button } from 'antd';

import Layout from '@components/Layout';

type DashboardPageProps = {
  stars: number;
};

const DashboardPage = ({ stars }: DashboardPageProps) => (
  <Layout>
    Next stars: {stars}
    <Button size="large" type="primary" htmlType="submit">
      OK
    </Button>
    <Button size="large" style={{ marginLeft: 8 }}>
      Cancel
    </Button>
  </Layout>
);

type DashboardPageInitialProps = {
  req: NextApiRequest;
};

DashboardPage.getInitialProps = async ({
  req,
}: DashboardPageInitialProps) => {
  const res = await fetch(
    'https://api.github.com/repos/zeit/next.js'
  );

  const json = await res.json();
  return { stars: json.stargazers_count };
};

export default DashboardPage;
