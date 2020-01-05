import Link from 'next/link';

import Layout from '@components/Layout';

const SignUpPage = () => (
  <Layout>
    <p>Sign Up Page</p>

    <Link href="/">
      <a>To Dashboard Page</a>
    </Link>
  </Layout>
);

export default SignUpPage;
