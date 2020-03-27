import { MutationResolvers } from '@generated/server';
import firebaseAdmin from '@services/firebase/admin';

interface Resolvers {
  Mutation: MutationResolvers;
}

export const resolvers: Resolvers = {
  Mutation: {
    promoteToPartner: async (parent, { uid }, { me }) => {
      try {
        await firebaseAdmin.auth().setCustomUserClaims(uid, {
          ...me.customClaims,
          partner: true,
        });
      } catch (error) {
        return false;
      }

      return true;
    },
  },
};
