import { render, fireEvent } from '@testing-library/react';
import waitForExpect from 'wait-for-expect';
import { MockedProvider } from '@apollo/react-testing';
import { GraphQLError } from 'graphql';

import PasswordChangeForm from '.';
import { PASSWORD_CHANGE } from './passwordChange';

describe('PasswordChangeForm', () => {
  const oldPassword = 'myoldpassword';
  const newPassword = 'mynewpassword';

  const onLoadingMessage = jest.fn();
  const onSuccessMessage = jest.fn();
  const onErrorMessage = jest.fn();

  let mutationCalled = false;

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
        <PasswordChangeForm
          onLoadingMessage={onLoadingMessage}
          onSuccessMessage={onSuccessMessage}
          onErrorMessage={onErrorMessage}
        />
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

    expect(onLoadingMessage).toHaveBeenCalledTimes(1);

    await waitForExpect(() => {
      expect(onErrorMessage).toHaveBeenCalledTimes(0);
      expect(onSuccessMessage).toHaveBeenCalledTimes(1);

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
        <PasswordChangeForm
          onLoadingMessage={onLoadingMessage}
          onSuccessMessage={onSuccessMessage}
          onErrorMessage={onErrorMessage}
        />
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

    expect(onLoadingMessage).toHaveBeenCalledTimes(1);

    await waitForExpect(() => {
      expect(onErrorMessage).toHaveBeenCalledTimes(1);
      expect(onSuccessMessage).toHaveBeenCalledTimes(0);

      expect(mutationCalled).toBe(true);
    });
  });
});
