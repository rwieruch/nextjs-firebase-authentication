import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { NextApiRequest } from 'next';

import HeadlinePrimary from '../src/components/HeadlinePrimary';

type DashboardProps = {
  stars: number;
};

const DashboardPage = ({ stars }: DashboardProps) => (
  <div>
    <HeadlinePrimary>Next stars: {stars}</HeadlinePrimary>

    <Link href="/signin">
      <a>To Sign In page</a>
    </Link>
  </div>
);

DashboardPage.getInitialProps = async ({
  req,
}: {
  req: NextApiRequest;
}) => {
  const res = await fetch(
    'https://api.github.com/repos/zeit/next.js'
  );

  const json = await res.json();
  return { stars: json.stargazers_count };
};

export default DashboardPage;
