import { MutationResolvers } from '@generated/server';
// import firebase from '@services/firebase/client';
import firebaseAdmin from '@services/firebase/admin';

import { FirebaseCourseContent } from '@services/firebase/course';

interface Resolvers {
  Mutation: MutationResolvers;
}

export const resolvers: Resolvers = {
  Mutation: {
    migrate: async (_, { migrationType }, { courseConnector }) => {
      switch (migrationType) {
        case 'COURSES':
          try {
            const users = await firebaseAdmin
              .database()
              .ref('users')
              .once('value')
              .then(snapshot => snapshot.val());

            const userList = Object.keys(users).map(key => ({
              uid: key,
              ...users[key],
            }));

            let result: any[] = [];

            for (let i = 0; i < userList.length; i++) {
              const { uid, courses } = userList[i];

              if (courses) {
                const courseList = Object.values(
                  courses
                ) as FirebaseCourseContent[];

                for (let j = 0; j < courseList.length; j++) {
                  const {
                    courseId,
                    packageId,
                    invoice: {
                      amount,
                      // createdAt,
                      currency,
                      paymentType,
                      coupon,
                    },
                  } = courseList[j];

                  // if (amount > 0) {
                  // oldprices.push(amount);
                  // }

                  let price = amount;

                  if (price === null) {
                    price = 0;
                  }

                  if (
                    typeof price === 'string' ||
                    (price as any) instanceof String
                  ) {
                    price = +price;
                  }

                  if (price.toString().includes('.')) {
                    price = +price
                      .toFixed(2)
                      .toString()
                      .replace('.', '');
                  } else if (price !== 0) {
                    price = +`${price.toString()}00`;
                  }

                  // if (price) {
                  // prices.push(price);
                  // }

                  // TODO use sensible defaults if value is not present
                  // TODO use `uid` as foreignKey
                  // TODO packageId to bundleId
                  // TODO migrate bundleId content

                  let newCurrency;

                  if (
                    currency == undefined ||
                    currency === 'MANUAL'
                  ) {
                    newCurrency = 'USD';
                  } else {
                    newCurrency = currency;
                  }

                  let newPaymentType;
                  if (
                    paymentType === 'LEANPUB' ||
                    paymentType === 'PATREON' ||
                    paymentType === 'GUMROAD' ||
                    paymentType === 'DISCOUNT'
                  ) {
                    newPaymentType = 'MANUAL';
                  } else {
                    newPaymentType = paymentType;
                  }

                  let bundleId = packageId;
                  if (!bundleId) {
                    bundleId = 'STUDENT';
                  }

                  if ((bundleId as any) === 'BOOK') {
                    bundleId = 'STUDENT';
                  }

                  if ((bundleId as any) === 'CODE') {
                    bundleId = 'INTERMEDIATE';
                  }

                  if (
                    (bundleId as any) === 'SCREENCAST' ||
                    (bundleId as any) === 'COMPLETE_COURSE'
                  ) {
                    bundleId = 'PROFESSIONAL';
                  }

                  const migratedCourse = {
                    userId: uid,
                    courseId,
                    bundleId,
                    // createdAt: new Date(createdAt),
                    price,
                    currency: newCurrency,
                    paymentType: newPaymentType,
                    coupon: coupon || '',
                  };

                  result.push(migratedCourse);

                  try {
                    await courseConnector.createCourse({
                      userId: migratedCourse.userId,
                      courseId: migratedCourse.courseId,
                      bundleId: migratedCourse.bundleId,
                      price: migratedCourse.price,
                      currency: migratedCourse.currency,
                      paymentType: migratedCourse.paymentType,
                      coupon: migratedCourse.coupon,
                    });

                    console.log(`Migration of ${i}`);
                  } catch (error) {
                    throw new Error(error);
                  }
                }
              }
            }

            // console.log(
            //   util.inspect(oldprices, { maxArrayLength: null })
            // );

            console.log(
              result.reduce((acc: any, value: any) => {
                if (!acc[value.courseId]) {
                  acc[value.courseId] = 1;
                } else {
                  acc[value.courseId] = acc[value.courseId] + 1;
                }

                return acc;
              }, {} as any)
            );

            console.log(
              result.reduce((acc: any, value: any) => {
                if (!acc[value.bundleId]) {
                  acc[value.bundleId] = 1;
                } else {
                  acc[value.bundleId] = acc[value.bundleId] + 1;
                }

                return acc;
              }, {} as any)
            );

            console.log(
              result.reduce((acc: any, value: any) => {
                if (!acc[value.currency]) {
                  acc[value.currency] = 1;
                } else {
                  acc[value.currency] = acc[value.currency] + 1;
                }

                return acc;
              }, {} as any)
            );

            console.log(
              result.reduce((acc: any, value: any) => {
                if (!acc[value.paymentType]) {
                  acc[value.paymentType] = 1;
                } else {
                  acc[value.paymentType] = acc[value.paymentType] + 1;
                }

                return acc;
              }, {} as any)
            );
          } catch (error) {
            throw new Error(error);
          }

          return true;
        case 'DISPLAYNAME':
          try {
            const users = await firebaseAdmin
              .database()
              .ref('users')
              .once('value')
              .then(snapshot => snapshot.val());

            const userList = Object.keys(users).map(key => ({
              uid: key,
              ...users[key],
            }));

            for (let i = 0; i < userList.length; i++) {
              const { uid, username } = userList[i];

              if (username) {
                try {
                  const user = await firebaseAdmin
                    .auth()
                    .getUser(uid);

                  console.log(`(${i}) New ${user.displayName}`);
                } catch (error) {
                  throw new Error(error);
                }
              }
            }
          } catch (error) {
            throw new Error(error);
          }

          return true;
        default:
          return false;
      }
    },
  },
};
