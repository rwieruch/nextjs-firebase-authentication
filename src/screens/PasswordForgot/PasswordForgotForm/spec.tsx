import { render, fireEvent, wait } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { GraphQLError } from 'graphql';
import { message } from 'antd';

import { PASSWORD_FORGOT } from '@queries/session';
import PasswordForgotForm from '.';

describe('PasswordForgotForm', () => {
  const email = 'example@example.com';

  message.error = jest.fn();

  let mutationCalled: boolean;

  beforeEach(() => {
    mutationCalled = false;
  });

  it('resets a password with success', async () => {
    const mocks = [
      {
        request: {
          query: PASSWORD_FORGOT,
          variables: { email },
        },
        result: () => {
          mutationCalled = true;
          return { data: { passwordForgot: null } };
        },
      },
    ];

    const component = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PasswordForgotForm />
      </MockedProvider>
    );

    fireEvent.change(
      component.getByLabelText('password-forgot-email'),
      {
        target: { value: email },
      }
    );

    expect(
      component
        .getByLabelText('password-forgot-submit')
        .classList.contains('ant-btn-loading')
    ).toBe(false);

    fireEvent.click(
      component.getByLabelText('password-forgot-submit')
    );

    expect(
      component
        .getByLabelText('password-forgot-submit')
        .classList.contains('ant-btn-loading')
    ).toBe(true);

    await wait(() => {
      expect(mutationCalled).toBe(true);
      expect(message.error).toHaveBeenCalledTimes(0);

      expect(
        component
          .getByLabelText('password-forgot-submit')
          .classList.contains('ant-btn-loading')
      ).toBe(false);
    });
  });

  it('resets a password with error', async () => {
    const mocks = [
      {
        request: {
          query: PASSWORD_FORGOT,
          variables: { email },
        },
        result: () => {
          mutationCalled = true;
          return { errors: [new GraphQLError('Error!')] };
        },
      },
    ];

    const component = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PasswordForgotForm />
      </MockedProvider>
    );

    fireEvent.change(
      component.getByLabelText('password-forgot-email'),
      {
        target: { value: email },
      }
    );

    fireEvent.click(
      component.getByLabelText('password-forgot-submit')
    );

    await wait(() => {
      expect(mutationCalled).toBe(true);
      expect(message.error).toHaveBeenCalledTimes(1);
    });
  });
});
