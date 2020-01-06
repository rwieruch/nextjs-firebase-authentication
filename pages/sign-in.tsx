import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Form, Input, Card } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import Layout from '@components/Layout';
import FormIcon from '@components/Form/Icon';
import FormItem from '@components/Form/Item';
import FormStretchedButton from '@components/Form/StretchedButton';

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
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    form.validateFields((error, values) => {
      if (!error) {
        console.log('Received values of form: ', values);
      }
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
          <Link href="/sign-up">
            <a>sign up now!</a>
          </Link>
        </>

        <Link href="/forgot-password">
          <ForgetPasswordAnchor>Forgot password</ForgetPasswordAnchor>
        </Link>
      </FormItem>
    </Form>
  );
};

const SignInFormEnhanced = Form.create({ name: 'sign-in' })(
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
