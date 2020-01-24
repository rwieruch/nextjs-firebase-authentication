import { ResolverContext } from '@typeDefs/resolver';
import { EXPIRES_IN } from '@constants/cookie';

export default {
  Mutation: {
    signIn: async (
      parent: any,
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
      parent: any,
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
      parent: any,
      { email }: { email: string },
      { firebase }: ResolverContext
    ) => {
      await firebase.auth().sendPasswordResetEmail(email);

      return true;
    },
    passwordChange: async (
      parent: any,
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
