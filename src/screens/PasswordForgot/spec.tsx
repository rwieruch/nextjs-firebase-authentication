import renderer from 'react-test-renderer';
import waitForExpect from 'wait-for-expect';

import { message } from 'antd';

import * as authService from '@services/firebase/auth';

import { PasswordForgotFormEnhanced } from '.';

describe('PasswordForgotFormEnhanced', () => {
  let component: any;
  let getComponent: any;
  let defaultProps: any;

  beforeEach(() => {
    defaultProps = {};

    getComponent = (props: any = defaultProps) => (
      <PasswordForgotFormEnhanced {...props} />
    );

    component = renderer.create(getComponent());
  });

  beforeEach(() => {
    message.loading = jest.fn();
    message.error = jest.fn();
    message.success = jest.fn();
  });

  it('renders', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('resets a password', () => {
    const email = 'example@example.com';

    beforeEach(() => {
      component.root
        .findByProps({ id: '/password-forgot_email' })
        .props.onChange({ target: { value: email } });
    });

    it('with success', async () => {
      const spy = jest
        .spyOn(authService, 'doPasswordReset')
        .mockImplementation(() => Promise.resolve());

      component.root
        .findByType('form')
        .props.onSubmit({ preventDefault: () => {} });

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

      component.root
        .findByType('form')
        .props.onSubmit({ preventDefault: () => {} });

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
