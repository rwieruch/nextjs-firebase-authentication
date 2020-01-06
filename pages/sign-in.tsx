import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Form, Input, Button, Card } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import Layout from '@components/Layout';
import FormIcon from '@components/FormIcon';

const SignInPageLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  flex: 1;
`;

const StyledCard = styled(Card)`
  min-width: 200px;
  max-width: 400px;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

const ForgetPasswordAnchor = styled.a`
  float: right;
`;

const SignInForm = ({ form }: FormComponentProps) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    form.validateFields((error, values) => {
      if (!error) {
        console.log('Received values of form: ', values);
      }
    });

    event.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <Form.Item>
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
      </Form.Item>
      <Form.Item>
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
      </Form.Item>
      <Form.Item>
        <StyledButton type="primary" htmlType="submit">
          Sign in
        </StyledButton>

        <Link href="/sign-up">
          <a>Or sign up now!</a>
        </Link>

        <Link href="/forgot-password">
          <ForgetPasswordAnchor>Forgot password</ForgetPasswordAnchor>
        </Link>
      </Form.Item>
    </Form>
  );
};

const SignInFormEnhanced = Form.create({ name: 'signin' })(
  SignInForm
);

const SignInPage = () => (
  <Layout>
    <SignInPageLayout>
      <StyledCard>
        <SignInFormEnhanced />
      </StyledCard>
    </SignInPageLayout>
  </Layout>
);

export default SignInPage;
