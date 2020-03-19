import * as firebaseAdminVanilla from 'firebase-admin';

import firebaseAdmin from '@services/firebase/admin';

import { COURSE } from '@data/course-keys';
import { BUNDLE } from '@data/bundle-keys';

export const createCourse = async ({
  uid,
  courseId,
  bundleId,
  amount,
  paymentType,
  coupon,
}: {
  uid?: string;
  courseId: COURSE;
  bundleId: BUNDLE;
  amount: number;
  paymentType: string;
  coupon: string;
}) =>
  await firebaseAdmin
    .database()
    .ref(`users/${uid}/courses`)
    .push()
    .set({
      courseId: courseId,
      packageId: bundleId,
      invoice: {
        createdAt:
          firebaseAdminVanilla.database.ServerValue.TIMESTAMP,
        amount,
        licensesCount: 1,
        currency: 'USD',
        paymentType,
        coupon,
      },
    });

export type FirebaseCourseContent = {
  courseId: COURSE;
  packageId: BUNDLE;
  invoice: {
    amount: number;
    createdAt: number;
    currency: string;
    licencesCount: number;
    paymentType: string;
  };
};

export type FirebaseCourse = {
  [key: string]: FirebaseCourseContent;
};

export const getCoursesById = async (
  uid?: string
): Promise<FirebaseCourse> =>
  await firebaseAdmin
    .database()
    .ref(`users/${uid}/courses`)
    .once('value')
    .then(snapshot => snapshot.val());
