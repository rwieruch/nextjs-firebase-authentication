import { MutationResolvers } from '@generated/server';
import { EXPIRES_IN } from '@constants/cookie';
import firebase from '@services/firebase/client';
import firebaseAdmin from '@services/firebase/admin';
import { inviteToSlack } from '@services/slack';
import { inviteToRevue } from '@services/revue';
import { inviteToConvertkit } from '@services/convertkit';

interface Resolvers {
  Mutation: MutationResolvers;
}

export const resolvers: Resolvers = {
  Mutation: {
    signIn: async (parent, { email, password }) => {
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
    signUp: async (parent, { username, email, password }) => {
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

      await inviteToSlack(email);
      await inviteToConvertkit(email);
      await inviteToRevue(email, username);

      return { sessionToken };
    },
    passwordForgot: async (parent, { email }) => {
      await firebase.auth().sendPasswordResetEmail(email);

      return true;
    },
    passwordChange: async (parent, { password }, { me }) => {
      await firebaseAdmin.auth().updateUser(me?.uid || '', {
        password,
      });

      return true;
    },
  },
};
