import { ResolverContext } from '@typeDefs/resolver';
import { EXPIRES_IN } from '@constants/cookie';

export default {
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
    signUp: async (
      _: any,
      {
        username,
        email,
        password,
      }: { username: string; email: string; password: string },
      { firebase }: ResolverContext
    ) => {
      await firebase.auth().createUser({
        email,
        password,
        displayName: username,
      });

      return true;
    },
  },
};
