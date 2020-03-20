import { createTestClient } from 'apollo-server-testing';
import { ApolloServer } from 'apollo-server-micro';

import firebaseAdmin from '@services/firebase/admin';
import schema from '@api/schema';

import {
  CREATE_FREE_COURSE,
  CREATE_ADMIN_COURSE,
} from '@queries/course';

describe('createFreeCourse', () => {
  let set: any;

  beforeEach(() => {
    set = firebaseAdmin
      .database()
      .ref()
      .push().set;
  });

  // it('creates a course', async () => {
  //   const server = new ApolloServer({
  //     schema,
  //     context: () => ({
  //       me: { uid: '1', email: 'example@example.com' },
  //     }),
  //   });

  //   const { mutate } = createTestClient(server);

  //   const { data, errors } = await mutate({
  //     mutation: CREATE_FREE_COURSE,
  //     variables: {
  //       courseId: 'THE_ROAD_TO_GRAPHQL',
  //       bundleId: 'STUDENT',
  //     },
  //   });

  //   expect(data).toMatchSnapshot();
  //   expect(errors).toEqual(undefined);

  //   expect(set).toHaveBeenCalledTimes(1);
  //   expect(set).toHaveBeenCalledWith({
  //     courseId: 'THE_ROAD_TO_GRAPHQL',
  //     packageId: 'STUDENT',
  //     invoice: {
  //       createdAt: 'TIMESTAMP',
  //       amount: 0,
  //       licensesCount: 1,
  //       currency: 'USD',
  //       paymentType: 'FREE',
  //     },
  //   });
  // });

  it('does not create a course if not authenticated', async () => {
    const server = new ApolloServer({
      schema,
      context: () => ({
        me: null,
      }),
    });

    const { mutate } = createTestClient(server);

    const { data, errors } = await mutate({
      mutation: CREATE_FREE_COURSE,
      variables: {
        courseId: 'THE_ROAD_TO_GRAPHQL',
        bundleId: 'STUDENT',
      },
    });

    expect(data).toEqual(null);
    expect(errors).toMatchSnapshot();
    expect(set).toHaveBeenCalledTimes(0);
  });

  it('does not create a course if not free', async () => {
    const server = new ApolloServer({
      schema,
      context: () => ({
        me: null,
      }),
    });

    const { mutate } = createTestClient(server);

    const { data, errors } = await mutate({
      mutation: CREATE_FREE_COURSE,
      variables: {
        courseId: 'THE_ROAD_TO_GRAPHQL',
        bundleId: 'PROFESSIONAL',
      },
    });

    expect(data).toEqual(null);
    expect(errors).toMatchSnapshot();
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
    const server = new ApolloServer({
      schema,
      context: () => ({
        me: {
          uid: '1',
          email: 'example@example.com',
          customClaims: { admin: true },
        },
      }),
    });

    const { mutate } = createTestClient(server);

    const { data, errors } = await mutate({
      mutation: CREATE_ADMIN_COURSE,
      variables: {
        uid: '2',
        courseId: 'THE_ROAD_TO_GRAPHQL',
        bundleId: 'STUDENT',
      },
    });

    expect(data).toMatchSnapshot();
    expect(errors).toEqual(undefined);

    expect(set).toHaveBeenCalledTimes(1);
    expect(set).toHaveBeenCalledWith({
      courseId: 'THE_ROAD_TO_GRAPHQL',
      packageId: 'STUDENT',
      invoice: {
        createdAt: 'TIMESTAMP',
        amount: 0,
        coupon: '',
        licensesCount: 1,
        currency: 'USD',
        paymentType: 'MANUAL',
      },
    });

    expect(ref).toHaveBeenCalledWith('users/2/courses');
  });

  it('creates a course that is not for free', async () => {
    const server = new ApolloServer({
      schema,
      context: () => ({
        me: {
          uid: '1',
          email: 'example@example.com',
          customClaims: { admin: true },
        },
      }),
    });

    const { mutate } = createTestClient(server);

    const { data, errors } = await mutate({
      mutation: CREATE_ADMIN_COURSE,
      variables: {
        uid: '2',
        courseId: 'THE_ROAD_TO_GRAPHQL',
        bundleId: 'PROFESSIONAL',
      },
    });

    expect(data).toMatchSnapshot();
    expect(errors).toEqual(undefined);

    expect(set).toHaveBeenCalledTimes(1);
    expect(set).toHaveBeenCalledWith({
      courseId: 'THE_ROAD_TO_GRAPHQL',
      packageId: 'PROFESSIONAL',
      invoice: {
        createdAt: 'TIMESTAMP',
        amount: 0,
        coupon: '',
        licensesCount: 1,
        currency: 'USD',
        paymentType: 'MANUAL',
      },
    });

    expect(ref).toHaveBeenCalledWith('users/2/courses');
  });

  it('does not create a course if not authenticated', async () => {
    const server = new ApolloServer({
      schema,
      context: () => ({
        me: null,
      }),
    });

    const { mutate } = createTestClient(server);

    const { data, errors } = await mutate({
      mutation: CREATE_ADMIN_COURSE,
      variables: {
        uid: '2',
        courseId: 'THE_ROAD_TO_GRAPHQL',
        bundleId: 'PROFESSIONAL',
      },
    });

    expect(data).toEqual(null);
    expect(errors).toMatchSnapshot();
    expect(set).toHaveBeenCalledTimes(0);
  });

  it('does not create a course if not admin', async () => {
    const server = new ApolloServer({
      schema,
      context: () => ({
        me: {
          uid: '1',
          email: 'example@example.com',
          customClaims: null,
        },
      }),
    });

    const { mutate } = createTestClient(server);

    const { data, errors } = await mutate({
      mutation: CREATE_ADMIN_COURSE,
      variables: {
        uid: '2',
        courseId: 'THE_ROAD_TO_GRAPHQL',
        bundleId: 'PROFESSIONAL',
      },
    });

    expect(data).toEqual(null);
    expect(errors).toMatchSnapshot();
    expect(set).toHaveBeenCalledTimes(0);
  });
});
