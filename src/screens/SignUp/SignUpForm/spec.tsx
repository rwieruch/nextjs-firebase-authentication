import { render, fireEvent } from '@testing-library/react';
import waitForExpect from 'wait-for-expect';
import { MockedProvider } from '@apollo/react-testing';
import { GraphQLError } from 'graphql';

import SignUpForm from '.';
import { SIGN_UP } from './signUp';

describe('SignUpForm', () => {
  const username = 'myusername';
  const email = 'example@example.com';
  const password = 'mypassword';

  const onSuccess = jest.fn();
  const onLoadingMessage = jest.fn();
  const onSuccessMessage = jest.fn();
  const onErrorMessage = jest.fn();

  let mutationCalled = false;

  it('signs up with success', async () => {
    const mocks = [
      {
        request: {
          query: SIGN_UP,
          variables: { username, email, password },
        },
        result: () => {
          mutationCalled = true;
          return { data: { signUp: { sessionToken: '1' } } };
        },
      },
    ];

    const component = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SignUpForm
          onSuccess={onSuccess}
          onLoadingMessage={onLoadingMessage}
          onSuccessMessage={onSuccessMessage}
          onErrorMessage={onErrorMessage}
        />
      </MockedProvider>
    );

    fireEvent.change(component.getByLabelText('sign-up-username'), {
      target: { value: username },
    });

    fireEvent.change(component.getByLabelText('sign-up-email'), {
      target: { value: email },
    });

    fireEvent.change(component.getByLabelText('sign-up-password'), {
      target: { value: password },
    });

    fireEvent.change(
      component.getByLabelText('sign-up-password-confirm'),
      {
        target: { value: password },
      }
    );

    fireEvent.click(component.getByLabelText('sign-up-submit'));

    expect(onLoadingMessage).toHaveBeenCalledTimes(1);

    await waitForExpect(() => {
      expect(onErrorMessage).toHaveBeenCalledTimes(0);
      expect(onSuccessMessage).toHaveBeenCalledTimes(1);

      expect(onSuccess).toHaveBeenCalledTimes(1);

      expect(mutationCalled).toBe(true);
    });
  });

  it('signs up with error', async () => {
    const mocks = [
      {
        request: {
          query: SIGN_UP,
          variables: { username, email, password },
        },
        result: () => {
          mutationCalled = true;
          return { errors: [new GraphQLError('Error!')] };
        },
      },
    ];

    const component = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SignUpForm
          onSuccess={onSuccess}
          onLoadingMessage={onLoadingMessage}
          onSuccessMessage={onSuccessMessage}
          onErrorMessage={onErrorMessage}
        />
      </MockedProvider>
    );

    fireEvent.change(component.getByLabelText('sign-up-username'), {
      target: { value: username },
    });

    fireEvent.change(component.getByLabelText('sign-up-email'), {
      target: { value: email },
    });

    fireEvent.change(component.getByLabelText('sign-up-password'), {
      target: { value: password },
    });

    fireEvent.change(
      component.getByLabelText('sign-up-password-confirm'),
      {
        target: { value: password },
      }
    );

    fireEvent.click(component.getByLabelText('sign-up-submit'));

    expect(onLoadingMessage).toHaveBeenCalledTimes(1);

    await waitForExpect(() => {
      expect(onErrorMessage).toHaveBeenCalledTimes(1);
      expect(onSuccessMessage).toHaveBeenCalledTimes(0);

      expect(mutationCalled).toBe(true);
    });
  });
});
