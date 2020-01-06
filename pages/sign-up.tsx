import Link from 'next/link';

import Layout from '@components/Layout';

const SignUpPage = () => (
  <Layout>
    <p>Sign Up Page</p>

    <Link href="/sign-in">
      <a>Or: Sign In</a>
    </Link>
  </Layout>
);

export default SignUpPage;
