import React from 'react';
import { useRouter } from 'next/router';
import { Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import cookie from 'js-cookie';

import { EXPIRES_IN } from '@constants/cookie';
import * as ROUTES from '@constants/routes';
import FormItem from '@components/Form/Item';
import FormStretchedButton from '@components/Form/StretchedButton';
import FormAtomButton from '@components/Form/AtomButton';
import useErrorIndicator from '@hooks/useErrorIndicator';

export const SIGN_UP = gql`
  mutation SignUp(
    $username: String!
    $email: String!
    $password: String!
  ) {
    signUp(username: $username, email: $email, password: $password) {
      sessionToken
    }
  }
`;

interface SignUpFormProps extends FormComponentProps {
  onSuccess: () => void;
  onNavigateSignIn?: () => void;
}

const SignUpForm = ({
  form,
  onSuccess,
  onNavigateSignIn,
}: SignUpFormProps) => {
  const router = useRouter();

  const [signUp, { loading, error }] = useMutation(SIGN_UP);

  useErrorIndicator({ error });

  const handleNavigateSignIn = onNavigateSignIn
    ? onNavigateSignIn
    : () => router.push(ROUTES.SIGN_IN);

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
    form.validateFields(async (error, values) => {
      if (error) return;

      try {
        const { data } = await signUp({
          variables: {
            username: values.username,
            email: values.email,
            password: values.password,
          },
        });

        cookie.set('session', data.signUp.sessionToken, {
          expires: EXPIRES_IN,
          // TODO: 1) Get it work with httpOnly 2) Get it work on the server. See SignUpForm.tsx
          // httpOnly: true,
          // secure: true,
        });

        onSuccess();
      } catch (error) {}
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
          loading={loading}
          type="primary"
          htmlType="submit"
          aria-label="sign-up-submit"
        >
          Sign Up
        </FormStretchedButton>

        <>
          Already have an account?&nbsp;
          <FormAtomButton
            type="link"
            onClick={handleNavigateSignIn}
            aria-label="sign-in-link"
          >
            Sign in!
          </FormAtomButton>
        </>
      </FormItem>
    </Form>
  );
};

export default Form.create<SignUpFormProps>({
  name: 'sign-up',
})(SignUpForm);
