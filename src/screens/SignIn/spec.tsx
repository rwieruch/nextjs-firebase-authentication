import renderer from 'react-test-renderer';
import waitForExpect from 'wait-for-expect';

import { message } from 'antd';

import * as ROUTES from '@constants/routes';
import * as authService from '@services/firebase/auth';

import SignInPage from '.';

describe('SignInPage', () => {
  let component: any;
  let getComponent: any;
  let defaultProps: any;

  beforeEach(() => {
    defaultProps = {};

    getComponent = (props: any = defaultProps) => (
      <SignInPage {...props} />
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

  it('renders a sign up link', () => {
    expect(
      component.root.findByProps({ href: ROUTES.SIGN_UP })
    ).toBeDefined();
  });

  it('renders a password forgot link', () => {
    expect(
      component.root.findByProps({ href: ROUTES.PASSWORD_FORGOT })
    ).toBeDefined();
  });

  describe('signs in a user', () => {
    const email = 'example@example.com';
    const password = 'mypassword';

    beforeEach(() => {
      component.root
        .findByProps({ id: '/sign-in_email' })
        .props.onChange({ target: { value: email } });

      component.root
        .findByProps({ id: '/sign-in_password' })
        .props.onChange({
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

      component.root
        .findByType('form')
        .props.onSubmit({ preventDefault: () => {} });

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

      component.root
        .findByType('form')
        .props.onSubmit({ preventDefault: () => {} });

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
