import { render, fireEvent, wait } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { GraphQLError } from 'graphql';
import { message } from 'antd';

import FreeCheckoutButton from '.';
import { CREATE_FREE_COURSE } from '@queries/course';

describe('FreeCheckoutButton', () => {
  message.error = jest.fn();

  const onSuccess = jest.fn();

  let mutationCalled: boolean;

  beforeEach(() => {
    mutationCalled = false;
  });

  it('checks out with success', async () => {
    const mocks = [
      {
        request: {
          query: CREATE_FREE_COURSE,
          variables: {
            courseId: 'THE_ROAD_TO_GRAPHQL',
            bundleId: 'STUDENT',
            onSuccess,
          },
        },
        result: () => {
          mutationCalled = true;
          return {
            data: { createFreeCourse: true },
          };
        },
      },
    ];

    const component = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <FreeCheckoutButton
          courseId={'THE_ROAD_TO_GRAPHQL'}
          bundleId={'STUDENT'}
          onSuccess={onSuccess}
        />
      </MockedProvider>
    );

    expect(
      component
        .getByLabelText('free-checkout')
        .classList.contains('ant-btn-loading')
    ).toBe(false);

    fireEvent.click(component.getByLabelText('free-checkout'));

    expect(
      component
        .getByLabelText('free-checkout')
        .classList.contains('ant-btn-loading')
    ).toBe(true);

    await wait(() => {
      expect(mutationCalled).toBe(true);
      expect(onSuccess).toHaveBeenCalledTimes(1);
      expect(message.error).toHaveBeenCalledTimes(0);

      expect(
        component
          .getByLabelText('free-checkout')
          .classList.contains('ant-btn-loading')
      ).toBe(false);
    });
  });

  it('checks out with error', async () => {
    const mocks = [
      {
        request: {
          query: CREATE_FREE_COURSE,
          variables: {
            courseId: 'THE_ROAD_TO_GRAPHQL',
            bundleId: 'STUDENT',
            onSuccess,
          },
        },
        result: () => {
          mutationCalled = true;
          return { errors: [new GraphQLError('Error!')] };
        },
      },
    ];

    const component = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <FreeCheckoutButton
          courseId={'THE_ROAD_TO_GRAPHQL'}
          bundleId={'STUDENT'}
          onSuccess={onSuccess}
        />
      </MockedProvider>
    );

    expect(
      component
        .getByLabelText('free-checkout')
        .classList.contains('ant-btn-loading')
    ).toBe(false);

    fireEvent.click(component.getByLabelText('free-checkout'));

    expect(
      component
        .getByLabelText('free-checkout')
        .classList.contains('ant-btn-loading')
    ).toBe(true);

    await wait(() => {
      expect(mutationCalled).toBe(true);
      expect(onSuccess).toHaveBeenCalledTimes(0);
      expect(message.error).toHaveBeenCalledTimes(1);

      expect(
        component
          .getByLabelText('free-checkout')
          .classList.contains('ant-btn-loading')
      ).toBe(false);
    });
  });
});
