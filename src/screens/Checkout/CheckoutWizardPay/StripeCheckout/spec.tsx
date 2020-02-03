import { render, fireEvent, wait } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { GraphQLError } from 'graphql';
import { message } from 'antd';

import { CourseId, BundleId } from '@generated/client';
import { STRIPE_CREATE_ORDER } from '@queries/stripe';

import StripeCheckoutButton from '.';

describe('StripeCheckoutButton', () => {
  message.error = jest.fn();

  let mutationCalled: boolean;

  beforeEach(() => {
    mutationCalled = false;
  });

  it('checks out with success', async () => {
    const stripeMock = {
      redirectToCheckout: jest.fn(() => ({
        anything: 'anything',
      })),
    };

    (global as any).Stripe = () => stripeMock;

    const mocks = [
      {
        request: {
          query: STRIPE_CREATE_ORDER,
          variables: {
            imageUrl: 'url',
            courseId: CourseId.TheRoadToGraphql,
            bundleId: BundleId.Student,
            coupon: 'coupon',
          },
        },
        result: () => {
          mutationCalled = true;
          return {
            data: { stripeCreateOrder: { id: '1' } },
          };
        },
      },
    ];

    const component = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <StripeCheckoutButton
          imageUrl={'url'}
          course={{
            header: 'The Road to GraphQL',
            courseId: CourseId.TheRoadToGraphql,
            bundle: {
              header: 'Student',
              bundleId: BundleId.Student,
              price: 1,
            },
          }}
          coupon={'coupon'}
        />
      </MockedProvider>
    );

    expect(
      component
        .getByLabelText('stripe-checkout')
        .classList.contains('ant-btn-loading')
    ).toBe(false);

    fireEvent.click(component.getByLabelText('stripe-checkout'));

    expect(
      component
        .getByLabelText('stripe-checkout')
        .classList.contains('ant-btn-loading')
    ).toBe(true);

    await wait(() => {
      expect(mutationCalled).toBe(true);
      expect(message.error).toHaveBeenCalledTimes(0);
      expect(stripeMock.redirectToCheckout).toHaveBeenCalledTimes(1);
      expect(stripeMock.redirectToCheckout).toHaveBeenCalledWith({
        sessionId: '1',
      });

      expect(
        component
          .getByLabelText('stripe-checkout')
          .classList.contains('ant-btn-loading')
      ).toBe(false);
    });
  });

  it('checks out with graphql error', async () => {
    const stripeMock = {
      redirectToCheckout: jest.fn(() => ({
        anything: 'anything',
      })),
    };

    (global as any).Stripe = () => stripeMock;

    const mocks = [
      {
        request: {
          query: STRIPE_CREATE_ORDER,
          variables: {
            imageUrl: 'url',
            courseId: CourseId.TheRoadToGraphql,
            bundleId: BundleId.Student,
            coupon: 'coupon',
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
        <StripeCheckoutButton
          imageUrl={'url'}
          course={{
            header: 'The Road to GraphQL',
            courseId: CourseId.TheRoadToGraphql,
            bundle: {
              header: 'Student',
              bundleId: BundleId.Student,
              price: 1,
            },
          }}
          coupon={'coupon'}
        />
      </MockedProvider>
    );

    fireEvent.click(component.getByLabelText('stripe-checkout'));

    await wait(() => {
      expect(mutationCalled).toBe(true);
      expect(message.error).toHaveBeenCalledTimes(1);
      expect(stripeMock.redirectToCheckout).toHaveBeenCalledTimes(0);
    });
  });

  it('checks out with stripe error', async () => {
    const stripeMock = {
      redirectToCheckout: jest.fn(() => ({
        error: {
          message: 'error',
        },
      })),
    };

    (global as any).Stripe = () => stripeMock;

    const mocks = [
      {
        request: {
          query: STRIPE_CREATE_ORDER,
          variables: {
            imageUrl: 'url',
            courseId: CourseId.TheRoadToGraphql,
            bundleId: BundleId.Student,
            coupon: 'coupon',
          },
        },
        result: () => {
          mutationCalled = true;
          return {
            data: { stripeCreateOrder: { id: '1' } },
          };
        },
      },
    ];

    const component = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <StripeCheckoutButton
          imageUrl={'url'}
          course={{
            header: 'The Road to GraphQL',
            courseId: CourseId.TheRoadToGraphql,
            bundle: {
              header: 'Student',
              bundleId: BundleId.Student,
              price: 1,
            },
          }}
          coupon={'coupon'}
        />
      </MockedProvider>
    );

    fireEvent.click(component.getByLabelText('stripe-checkout'));

    await wait(() => {
      expect(mutationCalled).toBe(true);
      expect(message.error).toHaveBeenCalledTimes(1);
    });
  });
});
