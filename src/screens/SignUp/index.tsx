import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Form, Input, Card, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import * as ROUTES from '@constants/routes';
import Layout from '@components/Layout';
import FormItem from '@components/Form/Item';
import FormStretchedButton from '@components/Form/StretchedButton';
import { doCreateUserWithEmailAndPassword } from '@services/firebase/auth';

const SignUpPageLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledCard = styled(Card)`
  min-width: 200px;
  max-width: 400px;
`;

const SignUpForm = ({ form }: FormComponentProps) => {
  const router = useRouter();

  const [
    confirmPasswordDirty,
    setConfirmPasswordDirty,
  ] = React.useState(false);

  const handleConfirmBlur = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPasswordDirty(
      confirmPasswordDirty || !!event.target.value
    );
  };

  const compareToFirstPassword = (
    _: any,
    value: any,
    callback: any
  ) => {
    if (value && value !== form.getFieldValue('password')) {
      callback('Your passwords are different.');
    } else {
      callback();
    }
  };

  const validateToNextPassword = (
    _: any,
    value: any,
    callback: any
  ) => {
    if (value && confirmPasswordDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    form.validateFields((error, values) => {
      if (error) return;

      message.loading({
        content: 'Loading ...',
        key: ROUTES.SIGN_UP,
      });

      doCreateUserWithEmailAndPassword(values.email, values.password)
        .then(result => {
          message.success({
            content: 'Success!',
            key: ROUTES.SIGN_UP,
            duration: 2,
          });

          router.push(ROUTES.INDEX);
        })
        .catch(error =>
          message.error({
            content: error.message,
            key: ROUTES.SIGN_UP,
            duration: 2,
          })
        );
    });

    event.preventDefault();
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 10 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };

  return (
    <Form {...formItemLayout} onSubmit={handleSubmit}>
      <FormItem label={<span>Personal Name</span>}>
        {form.getFieldDecorator('username', {
          rules: [
            {
              required: true,
              message: 'Please input your name!',
              whitespace: true,
            },
          ],
          validateFirst: true,
          validateTrigger: 'onBlur',
        })(<Input aria-label="sign-up-username" />)}
      </FormItem>

      <FormItem label="E-mail">
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
          validateFirst: true,
          validateTrigger: 'onBlur',
        })(<Input aria-label="sign-up-email" />)}
      </FormItem>

      <FormItem label="Password" hasFeedback>
        {form.getFieldDecorator('password', {
          rules: [
            {
              required: true,
              message: 'Please input your password!',
            },
            {
              min: 6,
              message: 'Your password is too short.',
            },
            {
              validator: validateToNextPassword,
            },
          ],
          validateFirst: true,
          validateTrigger: 'onBlur',
        })(<Input.Password aria-label="sign-up-password" />)}
      </FormItem>

      <FormItem label="Confirm Password" hasFeedback>
        {form.getFieldDecorator('confirm', {
          rules: [
            {
              required: true,
              message: 'Please confirm your password!',
            },
            {
              min: 6,
              message: 'Your password is too short.',
            },
            {
              validator: compareToFirstPassword,
            },
          ],
          validateFirst: true,
          validateTrigger: 'onBlur',
        })(
          <Input.Password
            onBlur={handleConfirmBlur}
            aria-label="sign-up-password-confirm"
          />
        )}
      </FormItem>

      <FormItem wrapperCol={{ sm: 24 }}>
        <FormStretchedButton
          type="primary"
          htmlType="submit"
          aria-label="sign-up-submit"
        >
          Sign Up
        </FormStretchedButton>

        <>
          Already have an account?&nbsp;
          <Link href={ROUTES.SIGN_IN}>
            <a aria-label="sign-in-link">Sign in!</a>
          </Link>
        </>
      </FormItem>
    </Form>
  );
};

const SignUpFormEnhanced = Form.create({
  name: ROUTES.SIGN_UP,
})(SignUpForm);

const SignUpPage = () => (
  <Layout>
    <SignUpPageLayout>
      <StyledCard title="Register your account">
        <SignUpFormEnhanced />
      </StyledCard>
    </SignUpPageLayout>
  </Layout>
);

export default SignUpPage;
