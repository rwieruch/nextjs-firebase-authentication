import { render, fireEvent } from '@testing-library/react';
import waitForExpect from 'wait-for-expect';
import { MockedProvider } from '@apollo/react-testing';
import { GraphQLError } from 'graphql';

import { message } from 'antd';

import PasswordForgotForm from '.';
import { PASSWORD_FORGOT } from './passwordForgot';

describe('PasswordForgotForm', () => {
  const email = 'example@example.com';

  let mutationCalled = false;

  beforeEach(() => {
    message.loading = jest.fn();
    message.error = jest.fn();
    message.success = jest.fn();
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

    fireEvent.click(
      component.getByLabelText('password-forgot-submit')
    );

    expect(message.loading).toHaveBeenCalledTimes(1);

    await waitForExpect(() => {
      expect(message.error).toHaveBeenCalledTimes(0);
      expect(message.success).toHaveBeenCalledTimes(1);

      expect(mutationCalled).toBe(true);
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

    expect(message.loading).toHaveBeenCalledTimes(1);

    await waitForExpect(() => {
      expect(message.error).toHaveBeenCalledTimes(1);
      expect(message.success).toHaveBeenCalledTimes(0);

      expect(mutationCalled).toBe(true);
    });
  });
});
