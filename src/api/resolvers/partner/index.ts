import { QueryResolvers, MutationResolvers } from '@generated/server';
import { hasPartnerRole } from '@validation/partner';

interface Resolvers {
  Query: QueryResolvers;
  Mutation: MutationResolvers;
}

export const resolvers: Resolvers = {
  Query: {
    partnerGetVisitors: async (
      _,
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
    partnerSales: async (
      _,
      { offset, limit },
      { me, partnerConnector }
    ) => {
      if (!me) {
        return [];
      }

      try {
        const {
          edges,
          total,
        } = await partnerConnector.getSalesByPartner(
          me.uid,
          offset,
          limit
        );

        return {
          edges: edges.map(saleByPartner => ({
            id: saleByPartner.id,
            createdAt: saleByPartner.createdAt,
            royalty: saleByPartner.royalty,
            price: saleByPartner.course.price,
            courseId: saleByPartner.course.courseId,
            bundleId: saleByPartner.course.bundleId,
            isCoupon: !!saleByPartner.course.coupon,
          })),
          pageInfo: {
            total,
          },
        };
      } catch (error) {
        return [];
      }
    },
    partnerPayments: async (_, __, { me, partnerConnector }) => {
      if (!me) {
        return [];
      }

      try {
        return await partnerConnector.getPaymentsByPartner(me.uid);
      } catch (error) {
        return [];
      }
    },
  },
  Mutation: {
    promoteToPartner: async (_, { uid }, { adminConnector }) => {
      try {
        await adminConnector.setCustomClaims(uid, {
          partner: true,
        });
      } catch (error) {
        return false;
      }

      return true;
    },
    partnerTrackVisitor: async (
      _,
      { partnerId },
      { partnerConnector, adminConnector }
    ) => {
      try {
        const partner = await adminConnector.getUser(partnerId);

        if (!hasPartnerRole(partner)) {
          return false;
        }
      } catch (error) {
        return false;
      }

      try {
        await partnerConnector.createVisitor(partnerId);
      } catch (error) {
        return false;
      }

      return true;
    },
  },
};
