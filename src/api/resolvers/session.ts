import { ResolverContext } from '@typeDefs/resolver';
import { EXPIRES_IN } from '@constants/cookie';

export default {
  Mutation: {
    signIn: async (
      _: any,
      { email, password }: { email: string; password: string },
      { firebaseAdmin, firebase }: ResolverContext
    ) => {
      const {
        user,
      } = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      const idToken = await user?.getIdToken();
      const sessionToken = await firebaseAdmin
        .auth()
        .createSessionCookie(idToken || '', {
          expiresIn: EXPIRES_IN,
        });

      // We manage the session ourselves.
      await firebase.auth().signOut();

      return { sessionToken };
    },
    signUp: async (
      _: any,
      {
        username,
        email,
        password,
      }: { username: string; email: string; password: string },
      { firebaseAdmin, firebase }: ResolverContext
    ) => {
      await firebaseAdmin.auth().createUser({
        email,
        password,
        displayName: username,
      });

      const {
        user,
      } = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      const idToken = await user?.getIdToken();
      const sessionToken = await firebaseAdmin
        .auth()
        .createSessionCookie(idToken || '', {
          expiresIn: EXPIRES_IN,
        });

      // We manage the session ourselves.
      await firebase.auth().signOut();

      return { sessionToken };
    },
    passwordForgot: async (
      _: any,
      { email }: { email: string },
      { firebase }: ResolverContext
    ) => {
      // await firebaseAdmin.auth().generatePasswordResetLink(email);

      await firebase.auth().sendSignInLinkToEmail(email, {
        handleCodeInApp: true,
        url: process.env.BASE_URL || '',
      });

      return true;
    },
    passwordChange: async (
      _: any,
      { password }: { password: string },
      { me, firebaseAdmin }: ResolverContext
    ) => {
      await firebaseAdmin.auth().updateUser(me.uid, {
        password,
      });

      return true;
    },
  },
};
