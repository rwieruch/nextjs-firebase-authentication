import { render, fireEvent } from '@testing-library/react';
import waitForExpect from 'wait-for-expect';

import { message } from 'antd';

import * as ROUTES from '@constants/routes';
import * as authService from '@services/firebase/auth';

import SignUpForm from '.';

describe('SignUpForm', () => {
  const username = 'example';
  const email = 'example@example.com';
  const password = 'mypassword';

  let component: any;
  let getComponent: any;
  let defaultProps: any;

  let usernameInput: any;
  let emailInput: any;
  let passwordInput: any;
  let passwordConfirmInput: any;
  let submitButton: any;
  let signInLink: any;

  beforeEach(() => {
    defaultProps = {};

    getComponent = (props: any = defaultProps) => (
      <SignUpForm {...props} />
    );

    component = render(getComponent());

    message.loading = jest.fn();
    message.error = jest.fn();
    message.success = jest.fn();

    usernameInput = component.getByLabelText('sign-up-username');
    emailInput = component.getByLabelText('sign-up-email');
    passwordInput = component.getByLabelText('sign-up-password');
    passwordConfirmInput = component.getByLabelText(
      'sign-up-password-confirm'
    );
    submitButton = component.getByLabelText('sign-up-submit');
    signInLink = component.getByLabelText('sign-in-link');
  });

  it('renders a sign in link', () => {
    expect(signInLink.getAttribute('href')).toEqual(ROUTES.SIGN_IN);
  });

  describe('signs up a user', () => {
    beforeEach(() => {
      fireEvent.change(usernameInput, {
        target: { value: username },
      });

      fireEvent.change(emailInput, {
        target: { value: email },
      });

      fireEvent.change(passwordInput, {
        target: { value: password },
      });

      fireEvent.change(passwordConfirmInput, {
        target: { value: password },
      });
    });

    it('with success', async () => {
      const spy = jest
        .spyOn(authService, 'doCreateUserWithEmailAndPassword')
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
        .spyOn(authService, 'doCreateUserWithEmailAndPassword')
        .mockImplementation(() =>
          Promise.reject(new Error('Weak password.'))
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
