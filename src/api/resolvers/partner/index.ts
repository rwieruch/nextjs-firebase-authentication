import { QueryResolvers, MutationResolvers } from '@generated/server';
import firebaseAdmin from '@services/firebase/admin';

interface Resolvers {
  Query: QueryResolvers;
  Mutation: MutationResolvers;
}

export const resolvers: Resolvers = {
  Query: {
    partnerGetVisitors: async (
      parent,
      { from, to },
      { partnerConnector }
    ) => {
      try {
        return await partnerConnector.getVisitorsBetweenAggregatedByDate(
          from,
          to
        );
      } catch (error) {
        return [];
      }
    },
  },
  Mutation: {
    promoteToPartner: async (parent, { uid }, { me }) => {
      try {
        await firebaseAdmin.auth().setCustomUserClaims(uid, {
          ...me?.customClaims,
          partner: true,
        });
      } catch (error) {
        return false;
      }

      return true;
    },
    partnerTrackVisitor: async (
      parent,
      { partnerId },
      { partnerConnector }
    ) => {
      try {
        await partnerConnector.createVisitor(partnerId);
      } catch (error) {
        return false;
      }

      return true;
    },
  },
};
