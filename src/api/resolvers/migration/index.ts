import { MutationResolvers } from '@generated/server';
import firebase from '@services/firebase/client';
import firebaseAdmin from '@services/firebase/admin';

interface Resolvers {
  Mutation: MutationResolvers;
}

export const resolvers: Resolvers = {
  Mutation: {
    migrate: async (parent, { migrationType }, { me }) => {
      switch (migrationType) {
        case 'DISPLAYNAME':
          try {
            const users = await firebaseAdmin
              .database()
              .ref('users')
              .once('value')
              .then(snapshot => snapshot.val());

            Object.keys(users).forEach(async (key, index) => {
              const { username, uid } = users[key];

              if (username) {
                console.log('Old', username, uid);
                //   try {
                //     await firebaseAdmin.auth().updateUser(uid, {
                //       displayName: username,
                //     });
                //   } catch (error) {
                //     console.log(error);
                //   }

                try {
                  const user = await firebaseAdmin
                    .auth()
                    .getUser(uid);
                  console.log(`(${index}) New ${user.displayName}`);
                } catch (error) {
                  console.log(error);
                }
              }
            });
          } catch (error) {
            console.log(error);
            return new Error(error);
          }

          return true;
        default:
          return false;
      }
    },
  },
};
