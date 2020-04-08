import axios from 'axios';

import { COURSE } from '@data/course-keys';
import { BUNDLE } from '@data/bundle-keys';
import { getUpgradeableCourses } from '@services/course';
import { Course } from '@models/course';

import { CouponConnector } from '@connectors/coupon';
import { CourseConnector } from '@connectors/course';

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

export const priceWithDiscount = (
  couponConnector: CouponConnector,
  courseConnector: CourseConnector
) => async (
  courseId: COURSE,
  bundleId: BUNDLE,
  price: number,
  coupon: string | undefined | null,
  uid: string | undefined | null
) => {
  if (!coupon || price === 0 || !uid) {
    return price;
  }

  // Custom Coupon

  let discountedPrice;

  discountedPrice = await couponConnector.redeemCoupon(coupon, price);

  if (discountedPrice !== price) {
    return discountedPrice;
  }

  // Upgrade

  const courses = await courseConnector.getCoursesByUserIdAndCourseId(
    uid,
    courseId
  );

  discountedPrice = await tryUpgradeDiscount(
    courseId,
    bundleId,
    courses,
    price,
    coupon,
    uid
  );

  if (discountedPrice !== price) {
    return discountedPrice;
  }

  // PPP

  discountedPrice = await tryPppDiscount(
    discountedPrice,
    coupon.replace(process.env.COUPON_SALT || '', '')
  );

  if (discountedPrice !== price) {
    return discountedPrice;
  }

  return price;
};
