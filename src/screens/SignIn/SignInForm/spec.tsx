import { render, fireEvent, wait } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { GraphQLError } from 'graphql';
import { message } from 'antd';

import { SIGN_IN } from '@queries/session';
import SignInForm from '.';

describe('SignInForm', () => {
  const email = 'example@example.com';
  const password = 'mypassword';

  const onSuccess = jest.fn();

  message.error = jest.fn();

  let mutationCalled: boolean;

  beforeEach(() => {
    mutationCalled = false;
  });

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
        <SignInForm onSuccess={onSuccess} />
      </MockedProvider>
    );

    fireEvent.change(component.getByLabelText('sign-in-email'), {
      target: { value: email },
    });

    fireEvent.change(component.getByLabelText('sign-in-password'), {
      target: { value: password },
    });

    expect(
      component
        .getByLabelText('sign-in-submit')
        .classList.contains('ant-btn-loading')
    ).toBe(false);

    fireEvent.click(component.getByLabelText('sign-in-submit'));

    expect(
      component
        .getByLabelText('sign-in-submit')
        .classList.contains('ant-btn-loading')
    ).toBe(true);

    await wait(() => {
      expect(onSuccess).toHaveBeenCalledTimes(1);
      expect(message.error).toHaveBeenCalledTimes(0);
      expect(mutationCalled).toBe(true);

      expect(
        component
          .getByLabelText('sign-in-submit')
          .classList.contains('ant-btn-loading')
      ).toBe(false);
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
        <SignInForm onSuccess={onSuccess} />
      </MockedProvider>
    );

    fireEvent.change(component.getByLabelText('sign-in-email'), {
      target: { value: email },
    });

    fireEvent.change(component.getByLabelText('sign-in-password'), {
      target: { value: password },
    });

    fireEvent.click(component.getByLabelText('sign-in-submit'));

    await wait(() => {
      expect(onSuccess).toHaveBeenCalledTimes(0);
      expect(message.error).toHaveBeenCalledTimes(1);
      expect(mutationCalled).toBe(true);
    });
  });
});
