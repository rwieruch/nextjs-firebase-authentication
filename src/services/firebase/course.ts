import * as firebaseAdminVanilla from 'firebase-admin';

import firebaseAdmin from '@services/firebase/admin';

import { COURSE } from '../../../content/course-keys';
import { BUNDLE } from '../../../content/course-keys';

export const createCourse = async ({
  uid,
  courseId,
  bundleId,
  amount,
  paymentType,
}: {
  uid: string;
  courseId: COURSE;
  bundleId: BUNDLE;
  amount: number;
  paymentType: string;
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
      },
    });
