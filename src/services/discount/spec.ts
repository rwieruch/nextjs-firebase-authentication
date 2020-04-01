import axios from 'axios';

import { priceWithDiscount } from './';

describe('priceWithDiscount', () => {
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

    await expect(
      priceWithDiscount(
        'THE_ROAD_TO_LEARN_REACT',
        'PROFESSIONAL',
        100,
        'MY_COUPON',
        ''
      )
    ).resolves.toEqual(10);
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

    await expect(
      priceWithDiscount(
        'THE_ROAD_TO_LEARN_REACT',
        'PROFESSIONAL',
        100,
        null,
        ''
      )
    ).resolves.toEqual(100);
  });

  it('applies no discount if third-party API throws error', async () => {
    const get = jest.spyOn(axios, 'get');
    get.mockImplementationOnce(() =>
      Promise.reject(new Error('error'))
    );

    await expect(
      priceWithDiscount(
        'THE_ROAD_TO_LEARN_REACT',
        'PROFESSIONAL',
        100,
        'MY_COUPON',
        ''
      )
    ).resolves.toEqual(100);
  });
});
