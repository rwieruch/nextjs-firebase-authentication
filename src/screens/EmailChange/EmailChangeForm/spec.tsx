import { render, fireEvent, wait } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { GraphQLError } from 'graphql';
import { message } from 'antd';

import { EMAIL_CHANGE } from '@queries/session';
import EmailChangeForm from '.';

describe('EmailChangeForm', () => {
  const newEmail = 'mynewemail@domain.comw';

  message.error = jest.fn();

  let mutationCalled: boolean;

  beforeEach(() => {
    mutationCalled = false;
  });

  it('changes a email with success', async () => {
    const mocks = [
      {
        request: {
          query: EMAIL_CHANGE,
          variables: { email: 'mynewemail@domain.comw' },
        },
        result: () => {
          mutationCalled = true;
          return { data: { emailChange: null } };
        },
      },
    ];

    const component = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <EmailChangeForm />
      </MockedProvider>
    );

    fireEvent.change(
      component.getByLabelText('email-change-email-new'),
      {
        target: { value: newEmail },
      }
    );

    fireEvent.change(
      component.getByLabelText('email-change-email-confirm'),
      {
        target: { value: newEmail },
      }
    );

    expect(
      component
        .getByLabelText('email-change-submit')
        .classList.contains('ant-btn-loading')
    ).toBe(false);

    fireEvent.click(component.getByLabelText('email-change-submit'));

    expect(
      component
        .getByLabelText('email-change-submit')
        .classList.contains('ant-btn-loading')
    ).toBe(true);

    await wait(() => {
      expect(mutationCalled).toBe(true);
      expect(message.error).toHaveBeenCalledTimes(0);

      expect(
        component
          .getByLabelText('email-change-submit')
          .classList.contains('ant-btn-loading')
      ).toBe(false);
    });
  });

  it('changes a email with error', async () => {
    const mocks = [
      {
        request: {
          query: EMAIL_CHANGE,
          variables: { email: 'mynewemail@domain.comw' },
        },
        result: () => {
          mutationCalled = true;
          return { errors: [new GraphQLError('Error!')] };
        },
      },
    ];

    const component = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <EmailChangeForm />
      </MockedProvider>
    );

    fireEvent.change(
      component.getByLabelText('email-change-email-new'),
      {
        target: { value: newEmail },
      }
    );

    fireEvent.change(
      component.getByLabelText('email-change-email-confirm'),
      {
        target: { value: newEmail },
      }
    );

    fireEvent.click(component.getByLabelText('email-change-submit'));

    await wait(() => {
      expect(mutationCalled).toBe(true);
      expect(message.error).toHaveBeenCalledTimes(1);
    });
  });
});
