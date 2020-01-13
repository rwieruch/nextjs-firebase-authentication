import Link from 'next/link';
import styled from 'styled-components';
import { Card, Col, Row } from 'antd';

import * as ROUTES from '@constants/routes';
import Layout from '@components/Layout';
import withAuthorization from '@components/Session/withAuthorization';

import { Session } from '@typeDefs/session';

const Container = styled.div`
  margin: 32px;
`;

const AccountPage = () => {
  return (
    <Layout>
      <Container>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Card title="Referral">
              <ul>
                <li>
                  <Link href={ROUTES.REFERRAL}>
                    <a>Referral Program</a>
                  </Link>
                </li>
              </ul>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Troubleshoot">
              <ul>
                <li>
                  <a href="mailto:hello@rwieruch.com">Contact</a>
                </li>
              </ul>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Security">
              <ul>
                <li>
                  <Link href={ROUTES.PASSWORD_CHANGE}>
                    <a>Change Password</a>
                  </Link>
                </li>
                <li>
                  <Link href={ROUTES.PASSWORD_FORGOT}>
                    <a>Forgot Password</a>
                  </Link>
                </li>
              </ul>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

const condition = (session: Session): boolean => !!session.authUser;

export default withAuthorization(condition)(AccountPage);
