import axios from 'axios';

import { COURSE } from '@data/course-keys';
import { BUNDLE } from '@data/bundle-keys';
// LEGACY
// import { getCoursesById } from '@services/firebase/course';
import { getUpgradeableCourses } from '@services/course';
import { Course } from '@models/course';

import { Ppp } from './types';

const getPpp = async (countryCodeIsoAlpha2: string) =>
  await axios.get(`${process.env.COUPON_URL}${countryCodeIsoAlpha2}`);

const getPppPrice = (price: number, ppp: Ppp) => {
  return ppp
    ? Number((ppp.pppConversionFactor * price).toFixed(0))
    : price;
};

const tryPppDiscount = async (price: number, coupon: string) => {
  try {
    const { data } = await getPpp(coupon);

    return getPppPrice(price, data.ppp);
  } catch (error) {
    return price;
  }
};

const tryUpgradeDiscount = async (
  courseId: COURSE,
  bundleId: BUNDLE,
  courses: Course[],
  price: number,
  coupon: string,
  uid: string
) => {
  // LEGACY
  //const courses = await getCoursesById(uid);

  if (!courses) {
    return price;
  }

  const upgradeableCourses = getUpgradeableCourses(courseId, courses);

  const upgradeableCourse = upgradeableCourses.find(
    course => course.bundle.bundleId === bundleId
  );

  if (upgradeableCourse?.bundle.bundleId === coupon) {
    return upgradeableCourse?.bundle.price;
  }

  return price;
};

export const getAsDiscount = async (
  courseId: COURSE,
  bundleId: BUNDLE,
  courses: Course[],
  price: number,
  coupon: string | undefined | null,
  uid: string | undefined | null
) => {
  if (!coupon || !uid || price === 0) {
    return price;
  }

  const salt = process.env.COUPON_SALT || '';
  const blandCoupon = coupon.replace(salt, '');

  let discountedPrice;

  discountedPrice = await tryUpgradeDiscount(
    courseId,
    bundleId,
    courses,
    price,
    blandCoupon,
    uid
  );

  discountedPrice = await tryPppDiscount(
    discountedPrice,
    blandCoupon
  );

  return discountedPrice;
};
