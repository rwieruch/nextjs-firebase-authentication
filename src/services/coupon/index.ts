import axios from 'axios';

import { Ppp } from './types';

const getPpp = async (countryCodeIsoAlpha2: string) =>
  await axios.get(`${process.env.COUPON_URL}${countryCodeIsoAlpha2}`);

const getPppAmount = (amount: number, ppp: Ppp) => {
  return ppp
    ? Number((ppp.pppConversionFactor * amount).toFixed(0))
    : amount;
};

export const getAsDiscount = async (
  amount: number,
  coupon: string | undefined | null
) => {
  if (!coupon) {
    return amount;
  }

  try {
    const salt = process.env.COUPON_SALT || '';

    const countryCodeIsoAlpha2 = coupon.replace(salt, '');

    const { data } = await getPpp(countryCodeIsoAlpha2);

    return getPppAmount(amount, data.ppp);
  } catch (error) {
    return amount;
  }
};
