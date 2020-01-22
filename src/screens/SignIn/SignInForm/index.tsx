import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { useApolloClient } from '@apollo/react-hooks';

import * as ROUTES from '@constants/routes';
import FormIcon from '@components/Form/Icon';
import FormItem from '@components/Form/Item';
import FormStretchedButton from '@components/Form/StretchedButton';
import FormAtomButton from '@components/Form/AtomButton';

import signIn from './signIn';

const StyledFormFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface SignInFormProps extends FormComponentProps {
  onNavigateSignUp?: () => void;
  onNavigatePasswordForgot?: () => void;
  onLoadingMessage?: () => void;
  onSuccessMessage?: () => void;
  onErrorMessage?: (error: any) => void;
}

const SignInForm = ({
  form,
  onNavigateSignUp,
  onNavigatePasswordForgot,
  onLoadingMessage = () => {},
  onSuccessMessage = () => {},
  onErrorMessage = () => {},
}: SignInFormProps) => {
  const router = useRouter();
  const apolloClient = useApolloClient();

  const handleNavigateSignUp = onNavigateSignUp
    ? onNavigateSignUp
    : () => router.push(ROUTES.SIGN_UP);

  const handleNavigatePasswordForgot = onNavigatePasswordForgot
    ? onNavigatePasswordForgot
    : () => router.push(ROUTES.PASSWORD_FORGOT);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    form.validateFields(async (error, values) => {
      if (error) return;

      onLoadingMessage();

      try {
        await signIn(apolloClient, values.email, values.password);

        onSuccessMessage();

        router.push(ROUTES.INDEX);
      } catch (error) {
        onErrorMessage(error);
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
              onClick={onNavigateSignUp}
              aria-label="sign-up-link"
            >
              sign up now!
            </FormAtomButton>
          </span>

          <FormAtomButton
            type="link"
            onClick={onNavigatePasswordForgot}
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
