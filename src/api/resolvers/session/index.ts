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
    signIn: async (_, { email, password }) => {
      let result;

      try {
        result = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
      } catch (error) {
        return new Error(error);
      }

      const idToken = await result.user?.getIdToken();
      const sessionToken = await firebaseAdmin
        .auth()
        .createSessionCookie(idToken || '', {
          expiresIn: EXPIRES_IN,
        });

      // We manage the session ourselves.
      await firebase.auth().signOut();

      return { sessionToken };
    },
    signUp: async (_, { username, email, password }) => {
      try {
        await firebaseAdmin.auth().createUser({
          email,
          password,
          displayName: username,
        });
      } catch (error) {
        if (
          error.message.includes('email address is already in use')
        ) {
          const customError =
            'You already registered with this email. Hint: Check your password manager for our old domain: roadtoreact.com';
          return new Error(customError);
        } else {
          return new Error(error);
        }
      }

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

      try {
        inviteToSlack(email);
      } catch (error) {
        console.log(error);
      }

      try {
        inviteToConvertkit(email, username);
      } catch (error) {
        console.log(error);
      }

      try {
        inviteToRevue(email, username);
      } catch (error) {
        console.log(error);
      }

      return { sessionToken };
    },
    passwordForgot: async (_, { email }) => {
      try {
        await firebase.auth().sendPasswordResetEmail(email);
      } catch (error) {
        return new Error(error);
      }

      return true;
    },
    passwordChange: async (_, { password }, { me }) => {
      try {
        await firebaseAdmin.auth().updateUser(me?.uid || '', {
          password,
        });
      } catch (error) {
        return new Error(error);
      }

      return true;
    },
    emailChange: async (_, { email }, { me }) => {
      try {
        await firebaseAdmin.auth().updateUser(me?.uid || '', {
          email,
        });
      } catch (error) {
        return new Error(error);
      }

      return true;
    },
  },
};
