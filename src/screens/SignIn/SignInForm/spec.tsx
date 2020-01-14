import { render, fireEvent } from '@testing-library/react';
import waitForExpect from 'wait-for-expect';

import { message } from 'antd';

import * as ROUTES from '@constants/routes';
import * as authService from '@services/firebase/auth';

import SignInForm from '.';

describe('SignInForm', () => {
  const email = 'example@example.com';
  const password = 'mypassword';

  let component: any;
  let getComponent: any;
  let defaultProps: any;

  let emailInput: any;
  let passwordInput: any;
  let submitButton: any;
  let signUpLink: any;
  let passwordForgotLink: any;

  beforeEach(() => {
    defaultProps = {};

    getComponent = (props: any = defaultProps) => (
      <SignInForm {...props} />
    );

    component = render(getComponent());

    message.loading = jest.fn();
    message.error = jest.fn();
    message.success = jest.fn();

    emailInput = component.getByLabelText('sign-in-email');
    passwordInput = component.getByLabelText('sign-in-password');
    submitButton = component.getByLabelText('sign-in-submit');
    signUpLink = component.getByLabelText('sign-up-link');
    passwordForgotLink = component.getByLabelText(
      'password-forgot-link'
    );
  });

  it('renders a sign up link', () => {
    expect(signUpLink.getAttribute('href')).toEqual(ROUTES.SIGN_UP);
  });

  it('renders a password forgot link', () => {
    expect(passwordForgotLink.getAttribute('href')).toEqual(
      ROUTES.PASSWORD_FORGOT
    );
  });

  describe('signs in a user', () => {
    beforeEach(() => {
      fireEvent.change(emailInput, {
        target: { value: email },
      });

      fireEvent.change(passwordInput, {
        target: { value: password },
      });
    });

    it('with success', async () => {
      const spy = jest
        .spyOn(authService, 'doSignInWithEmailAndPassword')
        .mockImplementation(() =>
          Promise.resolve({
            credential: null,
            user: null,
          })
        );

      fireEvent.click(submitButton);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(email, password);

      expect(message.loading).toHaveBeenCalledTimes(1);

      await waitForExpect(() => {
        expect(message.error).toHaveBeenCalledTimes(0);
        expect(message.success).toHaveBeenCalledTimes(1);
      });
    });

    it('with error', async () => {
      const spy = jest
        .spyOn(authService, 'doSignInWithEmailAndPassword')
        .mockImplementation(() =>
          Promise.reject(new Error('Wrong password.'))
        );

      fireEvent.click(submitButton);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(email, password);

      expect(message.loading).toHaveBeenCalledTimes(1);

      await waitForExpect(() => {
        expect(message.error).toHaveBeenCalledTimes(1);
        expect(message.success).toHaveBeenCalledTimes(0);
      });
    });
  });
});
