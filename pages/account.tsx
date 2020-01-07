import Layout from '@components/Layout';
import withAuthorization from '@components/Session/withAuthorization';

import { Session } from '@typeDefs/session';

const AccountPage = () => {
  return <Layout>Protected Account</Layout>;
};

const condition = (session: Session): boolean => !!session.authUser;

export default withAuthorization(condition)(AccountPage);
