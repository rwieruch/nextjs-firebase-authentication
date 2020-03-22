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

            const userList = Object.keys(users).map(key => ({
              uid: key,
              ...users[key],
            }));

            for (let i = 0; i < userList.length; i++) {
              const { uid, username } = userList[i];

              if (username) {
                try {
                  await firebaseAdmin.auth().updateUser(uid, {
                    displayName: username,
                  });

                  console.log(`(${i}) New ${username}`);
                } catch (error) {
                  console.log(error);
                }

                // try {
                //   const user = await firebaseAdmin
                //     .auth()
                //     .getUser(uid);

                // console.log(`(${i}) New ${user.displayName}`);
                // } catch (error) {
                //   console.log(error);
                // }
              }
            }
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
