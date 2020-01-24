import { render, fireEvent } from '@testing-library/react';
import waitForExpect from 'wait-for-expect';
import { MockedProvider } from '@apollo/react-testing';
import { GraphQLError } from 'graphql';

import SignInForm from '.';
import { SIGN_IN } from './signIn';

describe('SignInForm', () => {
  const email = 'example@example.com';
  const password = 'mypassword';

  const onSuccess = jest.fn();
  const onLoadingMessage = jest.fn();
  const onSuccessMessage = jest.fn();
  const onErrorMessage = jest.fn();

  let mutationCalled = false;

  it('signs in with success', async () => {
    const mocks = [
      {
        request: {
          query: SIGN_IN,
          variables: { email, password },
        },
        result: () => {
          mutationCalled = true;
          return { data: { signIn: { sessionToken: '1' } } };
        },
      },
    ];

    const component = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SignInForm
          onSuccess={onSuccess}
          onLoadingMessage={onLoadingMessage}
          onSuccessMessage={onSuccessMessage}
          onErrorMessage={onErrorMessage}
        />
      </MockedProvider>
    );

    fireEvent.change(component.getByLabelText('sign-in-email'), {
      target: { value: email },
    });

    fireEvent.change(component.getByLabelText('sign-in-password'), {
      target: { value: password },
    });

    fireEvent.click(component.getByLabelText('sign-in-submit'));

    expect(onLoadingMessage).toHaveBeenCalledTimes(1);

    await waitForExpect(() => {
      expect(onErrorMessage).toHaveBeenCalledTimes(0);
      expect(onSuccessMessage).toHaveBeenCalledTimes(1);

      expect(onSuccess).toHaveBeenCalledTimes(1);

      expect(mutationCalled).toBe(true);
    });
  });

  it('signs in with error', async () => {
    const mocks = [
      {
        request: {
          query: SIGN_IN,
          variables: { email, password },
        },
        result: () => {
          mutationCalled = true;
          return { errors: [new GraphQLError('Error!')] };
        },
      },
    ];

    const component = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SignInForm
          onSuccess={onSuccess}
          onLoadingMessage={onLoadingMessage}
          onSuccessMessage={onSuccessMessage}
          onErrorMessage={onErrorMessage}
        />
      </MockedProvider>
    );

    fireEvent.change(component.getByLabelText('sign-in-email'), {
      target: { value: email },
    });

    fireEvent.change(component.getByLabelText('sign-in-password'), {
      target: { value: password },
    });

    fireEvent.click(component.getByLabelText('sign-in-submit'));

    expect(onLoadingMessage).toHaveBeenCalledTimes(1);

    await waitForExpect(() => {
      expect(onErrorMessage).toHaveBeenCalledTimes(1);
      expect(onSuccessMessage).toHaveBeenCalledTimes(0);

      expect(mutationCalled).toBe(true);
    });
  });
});
