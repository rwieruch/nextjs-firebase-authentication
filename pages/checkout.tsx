import Link from 'next/link';

import Layout from '@components/Layout';

const CheckoutPage = () => (
  <Layout>
    <p>Checkout Page</p>
    <Link href="/">
      <a>To Dashboard Page</a>
    </Link>
  </Layout>
);

export default CheckoutPage;
