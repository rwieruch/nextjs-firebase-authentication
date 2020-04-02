import { render, fireEvent, wait } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { GraphQLError } from 'graphql';
import { message } from 'antd';

import { COMMUNITY_JOIN } from '@queries/session';
import CommunityJoinForm from '.';

describe('CommunityJoinForm', () => {
  const email = 'mynewemail@domain.comw';

  message.error = jest.fn();

  let mutationCalled: boolean;

  beforeEach(() => {
    mutationCalled = false;
  });

  it('join with email with success', async () => {
    const mocks = [
      {
        request: {
          query: COMMUNITY_JOIN,
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
        <CommunityJoinForm />
      </MockedProvider>
    );

    fireEvent.change(
      component.getByLabelText('community-join-email'),
      {
        target: { value: email },
      }
    );

    expect(
      component
        .getByLabelText('community-join-submit')
        .classList.contains('ant-btn-loading')
    ).toBe(false);

    fireEvent.click(
      component.getByLabelText('community-join-submit')
    );

    expect(
      component
        .getByLabelText('community-join-submit')
        .classList.contains('ant-btn-loading')
    ).toBe(true);

    await wait(() => {
      expect(mutationCalled).toBe(true);
      expect(message.error).toHaveBeenCalledTimes(0);

      expect(
        component
          .getByLabelText('community-join-submit')
          .classList.contains('ant-btn-loading')
      ).toBe(false);
    });
  });

  it('join community with email with error', async () => {
    const mocks = [
      {
        request: {
          query: COMMUNITY_JOIN,
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
        <CommunityJoinForm />
      </MockedProvider>
    );

    fireEvent.change(
      component.getByLabelText('community-join-email'),
      {
        target: { value: email },
      }
    );

    fireEvent.click(
      component.getByLabelText('community-join-submit')
    );

    await wait(() => {
      expect(mutationCalled).toBe(true);
      expect(message.error).toHaveBeenCalledTimes(1);
    });
  });
});
