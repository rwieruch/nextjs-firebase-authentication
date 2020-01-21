import { render, fireEvent } from '@testing-library/react';
import waitForExpect from 'wait-for-expect';
import { MockedProvider } from '@apollo/react-testing';
import { GraphQLError } from 'graphql';

import { message } from 'antd';

import PasswordChangeForm from '.';
import { PASSWORD_CHANGE } from './passwordChange';

describe('PasswordChangeForm', () => {
  const oldPassword = 'myoldpassword';
  const newPassword = 'mynewpassword';

  let mutationCalled = false;

  beforeEach(() => {
    message.loading = jest.fn();
    message.error = jest.fn();
    message.success = jest.fn();
  });

  it('changes a password with success', async () => {
    const mocks = [
      {
        request: {
          query: PASSWORD_CHANGE,
          variables: { password: 'mynewpassword' },
        },
        result: () => {
          mutationCalled = true;
          return { data: { passwordChange: null } };
        },
      },
    ];

    const component = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PasswordChangeForm />
      </MockedProvider>
    );

    fireEvent.change(
      component.getByLabelText('password-change-password-old'),
      {
        target: { value: oldPassword },
      }
    );

    fireEvent.change(
      component.getByLabelText('password-change-password-new'),
      {
        target: { value: newPassword },
      }
    );

    fireEvent.change(
      component.getByLabelText('password-change-password-confirm'),
      {
        target: { value: newPassword },
      }
    );

    fireEvent.click(
      component.getByLabelText('password-change-submit')
    );

    expect(message.loading).toHaveBeenCalledTimes(1);

    await waitForExpect(() => {
      expect(message.error).toHaveBeenCalledTimes(0);
      expect(message.success).toHaveBeenCalledTimes(1);

      expect(mutationCalled).toBe(true);
    });
  });

  it('changes a password with error', async () => {
    const mocks = [
      {
        request: {
          query: PASSWORD_CHANGE,
          variables: { password: 'mynewpassword' },
        },
        result: () => {
          mutationCalled = true;
          return { errors: [new GraphQLError('Error!')] };
        },
      },
    ];

    const component = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PasswordChangeForm />
      </MockedProvider>
    );

    fireEvent.change(
      component.getByLabelText('password-change-password-old'),
      {
        target: { value: oldPassword },
      }
    );

    fireEvent.change(
      component.getByLabelText('password-change-password-new'),
      {
        target: { value: newPassword },
      }
    );

    fireEvent.change(
      component.getByLabelText('password-change-password-confirm'),
      {
        target: { value: newPassword },
      }
    );

    fireEvent.click(
      component.getByLabelText('password-change-submit')
    );

    expect(message.loading).toHaveBeenCalledTimes(1);

    await waitForExpect(() => {
      expect(message.error).toHaveBeenCalledTimes(1);
      expect(message.success).toHaveBeenCalledTimes(0);

      expect(mutationCalled).toBe(true);
    });
  });
});
