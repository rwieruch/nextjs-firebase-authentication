import { Between } from 'typeorm';

import { QueryResolvers, MutationResolvers } from '@generated/server';
import firebaseAdmin from '@services/firebase/admin';
import { PartnerVisitor } from '@models/partner';
import { VisitorByDay } from '@generated/client';

interface Resolvers {
  Query: QueryResolvers;
  Mutation: MutationResolvers;
}

const sameDay = (x: Date, y: Date) => {
  return (
    x.getFullYear() === y.getFullYear() &&
    x.getMonth() === y.getMonth() &&
    x.getDate() === y.getDate()
  );
};

export const resolvers: Resolvers = {
  Query: {
    partnerGetVisitors: async (
      parent,
      { from, to },
      { partnerVisitorRepository }
    ) => {
      try {
        const visitors = await partnerVisitorRepository.find({
          createdAt: Between(from, to),
        });

        const aggregateByDay = (
          acc: VisitorByDay[],
          dbValue: PartnerVisitor
        ) => {
          const prevValue = acc[acc.length - 1];

          const newEntry =
            !acc.length ||
            !sameDay(prevValue.date, dbValue.createdAt);

          if (newEntry) {
            acc = acc.concat({ date: dbValue.createdAt, count: 1 });
          } else {
            prevValue.count = prevValue.count + 1;
          }

          return acc;
        };

        const visitorsAggregatedByDay = visitors.reduce(
          aggregateByDay,
          []
        );

        return visitorsAggregatedByDay;
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
      { partnerVisitorRepository }
    ) => {
      try {
        const partnerVisitor = new PartnerVisitor();
        partnerVisitor.partnerId = partnerId;

        await partnerVisitorRepository.save(partnerVisitor);
      } catch (error) {
        return false;
      }

      return true;
    },
  },
};
