import { render, fireEvent } from '@testing-library/react';
import waitForExpect from 'wait-for-expect';

import { message } from 'antd';

import * as authService from '@services/firebase/auth';

import PasswordForgotForm from '.';

describe('PasswordForgotForm', () => {
  const email = 'example@example.com';

  let component: any;
  let getComponent: any;
  let defaultProps: any;

  let emailInput: any;
  let submitButton: any;

  beforeEach(() => {
    defaultProps = {};

    getComponent = (props: any = defaultProps) => (
      <PasswordForgotForm {...props} />
    );

    component = render(getComponent());

    message.loading = jest.fn();
    message.error = jest.fn();
    message.success = jest.fn();

    emailInput = component.getByLabelText('password-forgot-email');
    submitButton = component.getByLabelText('password-forgot-submit');
  });

  describe('resets a password', () => {
    beforeEach(() => {
      fireEvent.change(emailInput, {
        target: { value: email },
      });
    });

    it('with success', async () => {
      const spy = jest
        .spyOn(authService, 'doPasswordReset')
        .mockImplementation(() => Promise.resolve());

      fireEvent.click(submitButton);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(email);

      expect(message.loading).toHaveBeenCalledTimes(1);

      await waitForExpect(() => {
        expect(message.error).toHaveBeenCalledTimes(0);
        expect(message.success).toHaveBeenCalledTimes(1);
      });
    });

    it('with error', async () => {
      const spy = jest
        .spyOn(authService, 'doPasswordReset')
        .mockImplementation(() =>
          Promise.reject(new Error('Wrong password.'))
        );

      fireEvent.click(submitButton);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(email);

      expect(message.loading).toHaveBeenCalledTimes(1);

      await waitForExpect(() => {
        expect(message.error).toHaveBeenCalledTimes(1);
        expect(message.success).toHaveBeenCalledTimes(0);
      });
    });
  });
});
