import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Form, Input, Card, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import * as ROUTES from '@constants/routes';
import Layout from '@components/Layout';
import FormIcon from '@components/Form/Icon';
import FormItem from '@components/Form/Item';
import FormStretchedButton from '@components/Form/StretchedButton';
import { doSignInWithEmailAndPassword } from '@services/firebase/auth';

const SignInPageLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  flex: 1;
`;

const StyledCard = styled(Card)`
  min-width: 200px;
  max-width: 600px;
`;

const ForgetPasswordAnchor = styled.a`
  float: right;
`;

const SignInForm = ({ form }: FormComponentProps) => {
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    form.validateFields((error, values) => {
      if (error) return;

      message.loading({
        content: 'Loading ...',
        key: ROUTES.SIGN_IN,
      });

      doSignInWithEmailAndPassword(values.email, values.password)
        .then(result => {
          message.success({
            content: 'Success!',
            key: ROUTES.SIGN_IN,
            duration: 2,
          });

          router.push(ROUTES.INDEX);
        })
        .catch(error =>
          message.error({
            content: error.message,
            key: ROUTES.SIGN_IN,
            duration: 2,
          })
        );
    });

    event.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormItem>
        {form.getFieldDecorator('email', {
          rules: [
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ],
          validateTrigger: 'onBlur',
        })(
          <Input
            prefix={<FormIcon type="user" />}
            placeholder="E-mail"
          />
        )}
      </FormItem>
      <FormItem>
        {form.getFieldDecorator('password', {
          rules: [
            {
              required: true,
              message: 'Please input your Password!',
            },
          ],
          validateTrigger: 'onBlur',
        })(
          <Input
            prefix={<FormIcon type="lock" />}
            type="password"
            placeholder="Password"
          />
        )}
      </FormItem>

      <FormItem>
        <FormStretchedButton type="primary" htmlType="submit">
          Sign In
        </FormStretchedButton>

        <>
          Or&nbsp;
          <Link href={ROUTES.SIGN_UP}>
            <a>sign up now!</a>
          </Link>
        </>

        <Link href={ROUTES.PASSWORD_FORGOT}>
          <ForgetPasswordAnchor>Forgot password</ForgetPasswordAnchor>
        </Link>
      </FormItem>
    </Form>
  );
};

const SignInFormEnhanced = Form.create({ name: ROUTES.SIGN_IN })(
  SignInForm
);

const SignInPage = () => (
  <Layout>
    <SignInPageLayout>
      <StyledCard title="Log in and get to learn">
        <SignInFormEnhanced />
      </StyledCard>
    </SignInPageLayout>
  </Layout>
);

export default SignInPage;
