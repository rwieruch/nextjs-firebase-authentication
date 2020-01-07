import { Button } from 'antd';

import Layout from '@components/Layout';
import withAuthorization from '@components/Session/withAuthorization';

const DashboardPage = () => {
  return (
    <Layout>
      <Button size="large" type="primary" htmlType="submit">
        OK
      </Button>
      <Button size="large" style={{ marginLeft: 8 }}>
        Cancel
      </Button>
    </Layout>
  );
};

export default withAuthorization(session => !!session.authUser)(
  DashboardPage
);
