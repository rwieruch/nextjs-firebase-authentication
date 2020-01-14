import { render, fireEvent } from '@testing-library/react';
import waitForExpect from 'wait-for-expect';

import { message } from 'antd';

import * as authService from '@services/firebase/auth';

import PasswordChangeForm from '.';

describe('PasswordChangeForm', () => {
  const oldPassword = 'myoldpassword';
  const newPassword = 'mynewpassword';

  let component: any;
  let getComponent: any;
  let defaultProps: any;

  let oldPasswordInput: any;
  let newPasswordInput: any;
  let confirmPasswordInput: any;
  let submitButton: any;

  beforeEach(() => {
    defaultProps = {};

    getComponent = (props: any = defaultProps) => (
      <PasswordChangeForm {...props} />
    );

    component = render(getComponent());

    message.loading = jest.fn();
    message.error = jest.fn();
    message.success = jest.fn();

    oldPasswordInput = component.getByLabelText(
      'password-change-password-old'
    );
    newPasswordInput = component.getByLabelText(
      'password-change-password-new'
    );
    confirmPasswordInput = component.getByLabelText(
      'password-change-password-confirm'
    );
    submitButton = component.getByLabelText('password-change-submit');
  });

  describe('updates a password', () => {
    beforeEach(() => {
      fireEvent.change(oldPasswordInput, {
        target: { value: oldPassword },
      });

      fireEvent.change(newPasswordInput, {
        target: { value: newPassword },
      });

      fireEvent.change(confirmPasswordInput, {
        target: { value: newPassword },
      });
    });

    it('with success', async () => {
      const spy = jest
        .spyOn(authService, 'doPasswordUpdate')
        .mockImplementation(() => Promise.resolve());

      fireEvent.click(submitButton);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(newPassword);

      expect(message.loading).toHaveBeenCalledTimes(1);

      await waitForExpect(() => {
        expect(message.error).toHaveBeenCalledTimes(0);
        expect(message.success).toHaveBeenCalledTimes(1);
      });
    });

    it('with error', async () => {
      const spy = jest
        .spyOn(authService, 'doPasswordUpdate')
        .mockImplementation(() =>
          Promise.reject(new Error('Weak password.'))
        );

      fireEvent.click(submitButton);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(newPassword);

      expect(message.loading).toHaveBeenCalledTimes(1);

      await waitForExpect(() => {
        expect(message.error).toHaveBeenCalledTimes(1);
        expect(message.success).toHaveBeenCalledTimes(0);
      });
    });
  });
});
