import { ForbiddenError } from 'apollo-server';

import firebaseAdmin from '@services/firebase/admin';
import { resolvers } from './course';

const { createFreeCourse, createAdminCourse } = resolvers.Mutation;

describe('createFreeCourse', () => {
  let set: any;

  beforeEach(() => {
    set = firebaseAdmin
      .database()
      .ref()
      .push().set;
  });

  it('creates a course', async () => {
    const result = (createFreeCourse as any)(
      null,
      {
        courseId: 'THE_ROAD_TO_GRAPHQL',
        bundleId: 'STUDENT',
      },
      {
        me: {
          uid: '1',
          email: 'example@example.com',
          customClaims: { admin: false },
        },
      }
    );

    await expect(result).resolves.toEqual(true);

    expect(set).toHaveBeenCalledTimes(1);

    expect(set).toHaveBeenCalledWith({
      courseId: 'THE_ROAD_TO_GRAPHQL',
      packageId: 'STUDENT',
      invoice: {
        createdAt: 'TIMESTAMP',
        amount: 0,
        licensesCount: 1,
        currency: 'USD',
        paymentType: 'FREE',
      },
    });
  });

  it('does not create a course if not authenticated', async () => {
    const result = (createFreeCourse as any)(
      null,
      {
        courseId: 'THE_ROAD_TO_GRAPHQL',
        bundleId: 'STUDENT',
      },
      { me: null },
      null
    );

    await expect(result).resolves.toEqual(
      new ForbiddenError('Not authenticated as user.')
    );

    expect(set).toHaveBeenCalledTimes(0);
  });

  it('does not create a course if not free', async () => {
    const result = (createFreeCourse as any)(
      null,
      {
        courseId: 'THE_ROAD_TO_GRAPHQL',
        bundleId: 'PROFESSIONAL',
      },
      { me: { uid: '1', email: 'example@example.com' } },
      null
    );

    await expect(result).resolves.toEqual(
      new Error('This course is not for free.')
    );

    expect(set).toHaveBeenCalledTimes(0);
  });
});

describe('createAdminCourse', () => {
  let set: any;
  let ref: any;

  beforeEach(() => {
    ref = firebaseAdmin.database().ref;

    set = firebaseAdmin
      .database()
      .ref()
      .push().set;
  });

  it('creates a course', async () => {
    const result = (createAdminCourse as any)(
      null,
      {
        uid: '2',
        courseId: 'THE_ROAD_TO_GRAPHQL',
        bundleId: 'PROFESSIONAL',
      },
      {
        me: {
          uid: '1',
          email: 'example@example.com',
          customClaims: { admin: true },
        },
      },
      null
    );

    await expect(result).resolves.toEqual(true);

    expect(set).toHaveBeenCalledTimes(1);

    expect(ref).toHaveBeenCalledWith('users/2/courses');

    expect(set).toHaveBeenCalledWith({
      courseId: 'THE_ROAD_TO_GRAPHQL',
      packageId: 'PROFESSIONAL',
      invoice: {
        createdAt: 'TIMESTAMP',
        amount: 0,
        licensesCount: 1,
        currency: 'USD',
        paymentType: 'MANUAL',
      },
    });
  });

  it('does not create a course if not authenticated', async () => {
    const result = (createAdminCourse as any)(
      null,
      {
        uid: '2',
        courseId: 'THE_ROAD_TO_GRAPHQL',
        bundleId: 'PROFESSIONAL',
      },
      { me: null },
      null
    );

    await expect(result).resolves.toEqual(
      new ForbiddenError('Not authenticated as user.')
    );

    expect(set).toHaveBeenCalledTimes(0);
  });

  it('does not create a course if not admin', async () => {
    const result = (createAdminCourse as any)(
      null,
      {
        uid: '2',
        courseId: 'THE_ROAD_TO_GRAPHQL',
        bundleId: 'PROFESSIONAL',
      },
      {
        me: {
          uid: '1',
          email: 'example@example.com',
          customClaims: { admin: false },
        },
      },
      null
    );

    await expect(result).resolves.toEqual(
      new ForbiddenError('No admin user.')
    );

    expect(set).toHaveBeenCalledTimes(0);
  });
});
