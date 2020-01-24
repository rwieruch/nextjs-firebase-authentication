import { render, fireEvent } from '@testing-library/react';
import waitForExpect from 'wait-for-expect';
import { MockedProvider } from '@apollo/react-testing';
import { GraphQLError } from 'graphql';

import PasswordForgotForm from '.';
import { PASSWORD_FORGOT } from './passwordForgot';

describe('PasswordForgotForm', () => {
  const email = 'example@example.com';

  const onLoadingMessage = jest.fn();
  const onSuccessMessage = jest.fn();
  const onErrorMessage = jest.fn();

  let mutationCalled = false;

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
        <PasswordForgotForm
          onLoadingMessage={onLoadingMessage}
          onSuccessMessage={onSuccessMessage}
          onErrorMessage={onErrorMessage}
        />
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

    expect(onLoadingMessage).toHaveBeenCalledTimes(1);

    await waitForExpect(() => {
      expect(onErrorMessage).toHaveBeenCalledTimes(0);
      expect(onSuccessMessage).toHaveBeenCalledTimes(1);

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
        <PasswordForgotForm
          onLoadingMessage={onLoadingMessage}
          onSuccessMessage={onSuccessMessage}
          onErrorMessage={onErrorMessage}
        />
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

    expect(onLoadingMessage).toHaveBeenCalledTimes(1);

    await waitForExpect(() => {
      expect(onErrorMessage).toHaveBeenCalledTimes(1);
      expect(onSuccessMessage).toHaveBeenCalledTimes(0);

      expect(mutationCalled).toBe(true);
    });
  });
});
