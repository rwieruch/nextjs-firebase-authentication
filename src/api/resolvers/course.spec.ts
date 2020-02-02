import { ForbiddenError } from 'apollo-server';

import resolvers from './course';
import firebaseAdmin from '../../services/firebase/admin';

jest.mock('firebase-admin', () => {
  return {
    database: {
      ServerValue: {
        TIMESTAMP: 'TIMESTAMP',
      },
    },
  };
});

jest.mock('@services/firebase/admin', () => {
  const set = jest.fn();

  return {
    database: jest.fn(() => ({
      ref: jest.fn(() => ({
        push: jest.fn(() => ({
          set,
        })),
      })),
    })),
  };
});

describe('createFreeCourse', () => {
  let set;

  beforeEach(() => {
    set = firebaseAdmin
      .database()
      .ref()
      .push().set;
  });

  it('creates a course', async () => {
    const result = resolvers.Mutation.createFreeCourse(
      null,
      {
        courseId: 'THE_ROAD_TO_GRAPHQL',
        bundleId: 'STUDENT',
      },
      { me: { uid: '1', email: 'example@example.com' } },
      null
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
    const result = resolvers.Mutation.createFreeCourse(
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
    const result = resolvers.Mutation.createFreeCourse(
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
