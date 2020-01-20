import { combineResolvers } from 'graphql-resolvers';

import { ResolverContext } from '@typeDefs/resolver';
import { EXPIRES_IN } from '@constants/cookie';
import { isAuthenticated } from '@api/authorization/isAuthenticated';

export default {
  Query: {
    me: combineResolvers(
      isAuthenticated,
      (_, __, { me }: ResolverContext) => {
        return {
          email: me.email,
          uid: me.uid,
        };
      }
    ),
  },
  Mutation: {
    signIn: async (
      _: any,
      { idToken }: { idToken: string },
      { firebase }: ResolverContext
    ) => {
      const sessionToken = await firebase
        .auth()
        .createSessionCookie(idToken, {
          expiresIn: EXPIRES_IN,
        });

      return { sessionToken };
    },
  },
};
