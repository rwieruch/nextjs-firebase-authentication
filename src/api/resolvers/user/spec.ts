import { createTestClient } from 'apollo-server-testing';
import { ApolloServer } from 'apollo-server-micro';

import schema from '@api/schema';

import { GET_ME } from '@queries/user';

describe('me', () => {
  it('returns the signed in user', async () => {
    const server = new ApolloServer({
      schema,
      context: () => ({
        me: { uid: '1', email: 'example@example.com' },
      }),
    });

    const { mutate } = createTestClient(server);

    const { data, errors } = await mutate({
      mutation: GET_ME,
    });

    expect(data).toMatchSnapshot();
    expect(errors).toEqual(undefined);
  });

  it('returns nothing if no user is signed in', async () => {
    const server = new ApolloServer({
      schema,
      context: () => ({
        me: null,
      }),
    });

    const { mutate } = createTestClient(server);

    const { data, errors } = await mutate({
      mutation: GET_ME,
    });

    expect(data).toMatchSnapshot();
    expect(errors).toMatchSnapshot();
  });
});
