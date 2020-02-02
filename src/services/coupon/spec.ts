import axios from 'axios';

import { getAsDiscount } from './';

describe('getAsDiscount', () => {
  it('applies successfully the discount if coupon', async () => {
    const data = {
      data: {
        ppp: {
          pppConversionFactor: 0.1,
        },
      },
    };

    const get = jest.spyOn(axios, 'get');
    get.mockImplementationOnce(() => Promise.resolve(data));

    await expect(getAsDiscount(100, 'MY_COUPON')).resolves.toEqual(
      10
    );
  });

  it('applies no discount if no coupon', async () => {
    const data = {
      data: {
        ppp: {
          pppConversionFactor: 0.1,
        },
      },
    };

    const get = jest.spyOn(axios, 'get');
    get.mockImplementationOnce(() => Promise.resolve(data));

    await expect(getAsDiscount(100)).resolves.toEqual(100);
  });

  it('applies no discount if third-party API throws error', async () => {
    const get = jest.spyOn(axios, 'get');
    get.mockImplementationOnce(() =>
      Promise.reject(new Error('error'))
    );

    await expect(getAsDiscount(100)).resolves.toEqual(100);
  });
});
