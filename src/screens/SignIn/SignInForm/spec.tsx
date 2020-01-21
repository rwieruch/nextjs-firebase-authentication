import { render, fireEvent } from '@testing-library/react';
import waitForExpect from 'wait-for-expect';
import { MockedProvider } from '@apollo/react-testing';
import { GraphQLError } from 'graphql';

import { message } from 'antd';

import SignInForm from '.';
import { SIGN_IN } from './signIn';

describe('SignInForm', () => {
  const email = 'example@example.com';
  const password = 'mypassword';

  let mutationCalled = false;

  beforeEach(() => {
    message.loading = jest.fn();
    message.error = jest.fn();
    message.success = jest.fn();
  });

  it('signs in with success', async () => {
    const mocks = [
      {
        request: {
          query: SIGN_IN,
          variables: { idToken: '1' },
        },
        result: () => {
          mutationCalled = true;
          return { data: { signIn: { sessionToken: '1' } } };
        },
      },
    ];

    const component = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SignInForm />
      </MockedProvider>
    );

    fireEvent.change(component.getByLabelText('sign-in-email'), {
      target: { value: email },
    });

    fireEvent.change(component.getByLabelText('sign-in-password'), {
      target: { value: password },
    });

    fireEvent.click(component.getByLabelText('sign-in-submit'));

    expect(message.loading).toHaveBeenCalledTimes(1);

    await waitForExpect(() => {
      expect(message.error).toHaveBeenCalledTimes(0);
      expect(message.success).toHaveBeenCalledTimes(1);

      expect(mutationCalled).toBe(true);
    });
  });

  it('signs in with error', async () => {
    const mocks = [
      {
        request: {
          query: SIGN_IN,
          variables: { idToken: '1' },
        },
        result: () => {
          mutationCalled = true;
          return { errors: [new GraphQLError('Error!')] };
        },
      },
    ];

    const component = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SignInForm />
      </MockedProvider>
    );

    fireEvent.change(component.getByLabelText('sign-in-email'), {
      target: { value: email },
    });

    fireEvent.change(component.getByLabelText('sign-in-password'), {
      target: { value: password },
    });

    fireEvent.click(component.getByLabelText('sign-in-submit'));

    expect(message.loading).toHaveBeenCalledTimes(1);

    await waitForExpect(() => {
      expect(message.error).toHaveBeenCalledTimes(1);
      expect(message.success).toHaveBeenCalledTimes(0);

      expect(mutationCalled).toBe(true);
    });
  });
});
