import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import cookie from 'js-cookie';

import { useSignInMutation } from '@generated/client';
import { SIGN_IN } from '@queries/session';
import * as ROUTES from '@constants/routes';
import { EXPIRES_IN } from '@constants/cookie';
import FormIcon from '@components/Form/Icon';
import FormItem from '@components/Form/Item';
import FormStretchedButton from '@components/Form/StretchedButton';
import FormAtomButton from '@components/Form/AtomButton';
import useErrorIndicator from '@hooks/useErrorIndicator';

const StyledFormFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface SignInFormProps extends FormComponentProps {
  onSuccess: () => void;
  onNavigateSignUp?: () => void;
  onNavigatePasswordForgot?: () => void;
}

const SignInForm = ({
  form,
  onSuccess,
  onNavigateSignUp,
  onNavigatePasswordForgot,
}: SignInFormProps) => {
  const router = useRouter();

  const [signIn, { loading, error }] = useSignInMutation(SIGN_IN);

  useErrorIndicator({ error });

  const handleNavigateSignUp = onNavigateSignUp
    ? onNavigateSignUp
    : () => router.push(ROUTES.SIGN_UP);

  const handleNavigatePasswordForgot = onNavigatePasswordForgot
    ? onNavigatePasswordForgot
    : () => router.push(ROUTES.PASSWORD_FORGOT);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    form.validateFields(async (error, values) => {
      if (error) return;

      try {
        const { data } = await signIn({
          variables: {
            email: values.email,
            password: values.password,
          },
        });

        cookie.set('session', data?.signIn.sessionToken || '', {
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
            aria-label="sign-in-email"
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
            aria-label="sign-in-password"
          />
        )}
      </FormItem>

      <FormItem>
        <FormStretchedButton
          loading={loading}
          type="primary"
          htmlType="submit"
          aria-label="sign-in-submit"
        >
          Sign In
        </FormStretchedButton>

        <StyledFormFooter>
          <span>
            Or&nbsp;
            <FormAtomButton
              type="link"
              onClick={handleNavigateSignUp}
              aria-label="sign-up-link"
            >
              sign up now!
            </FormAtomButton>
          </span>

          <FormAtomButton
            type="link"
            onClick={handleNavigatePasswordForgot}
            aria-label="password-forgot-link"
          >
            Forgot password
          </FormAtomButton>
        </StyledFormFooter>
      </FormItem>
    </Form>
  );
};

export default Form.create<SignInFormProps>({
  name: 'sign-in',
})(SignInForm);
