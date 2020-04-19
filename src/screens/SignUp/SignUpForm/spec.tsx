import { render, fireEvent, wait } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { GraphQLError } from 'graphql';
import { message } from 'antd';

import { SIGN_UP } from '@queries/session';
import SignUpForm from '.';

describe('SignUpForm', () => {
  const username = 'myusername';
  const email = 'example@example.com';
  const password = 'mypassword';

  const onSuccess = jest.fn();

  message.error = jest.fn();

  let mutationCalled: boolean;

  beforeEach(() => {
    mutationCalled = false;
  });

  it('signs up with success', async () => {
    const mocks = [
      {
        request: {
          query: SIGN_UP,
          variables: { username, email, password },
        },
        result: () => {
          mutationCalled = true;
          return { data: { signUp: { token: '1' } } };
        },
      },
    ];

    const component = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SignUpForm onSuccess={onSuccess} />
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

    expect(
      component
        .getByLabelText('sign-up-submit')
        .classList.contains('ant-btn-loading')
    ).toBe(false);

    fireEvent.click(component.getByLabelText('sign-up-submit'));

    expect(
      component
        .getByLabelText('sign-up-submit')
        .classList.contains('ant-btn-loading')
    ).toBe(true);

    await wait(() => {
      expect(onSuccess).toHaveBeenCalledTimes(1);
      expect(message.error).toHaveBeenCalledTimes(0);
      expect(mutationCalled).toBe(true);

      expect(
        component
          .getByLabelText('sign-up-submit')
          .classList.contains('ant-btn-loading')
      ).toBe(false);
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
        <SignUpForm onSuccess={onSuccess} />
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

    await wait(() => {
      expect(mutationCalled).toBe(true);
      expect(onSuccess).toHaveBeenCalledTimes(0);
      expect(message.error).toHaveBeenCalledTimes(1);
    });
  });
});
