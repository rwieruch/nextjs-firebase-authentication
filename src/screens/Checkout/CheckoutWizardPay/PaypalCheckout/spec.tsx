import { render, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';

import { CourseId, BundleId } from '@generated/client';
import PaypalCheckout from '.';

describe('PaypalCheckout', () => {
  const onSuccess = jest.fn();
  const onBack = jest.fn();

  it('uses the back button', async () => {
    (global as any).paypal = {
      Buttons: jest.fn(() => ({
        render: jest.fn(),
      })),
    };

    const component = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <PaypalCheckout
          storefrontCourse={{
            header: 'The Road to GraphQL',
            courseId: CourseId.TheRoadToGraphql,
            bundle: {
              header: 'Student',
              bundleId: BundleId.Student,
              price: 1,
            },
          }}
          coupon={'coupon'}
          onSuccess={onSuccess}
          onBack={onBack}
        />
      </MockedProvider>
    );

    fireEvent.click(component.getByLabelText('back-button'));

    expect(onBack).toHaveBeenCalledTimes(1);
  });
});
