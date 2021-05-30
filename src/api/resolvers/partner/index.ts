import {
  ObjectType,
  Field,
  Arg,
  Ctx,
  Resolver,
  Query,
  Mutation,
  UseMiddleware,
} from 'type-graphql';

import type { ResolverContext } from '@typeDefs/resolver';
import { hasPartnerRole } from '@validation/partner';
import { isAuthenticated } from '@api/middleware/resolver/isAuthenticated';
import { isAdmin } from '@api/middleware/resolver/isAdmin';
import { isPartner } from '@api/middleware/resolver/isPartner';

@ObjectType()
export class VisitorByDay {
  @Field()
  date: Date;

  @Field()
  count: number;
}

@ObjectType()
class PartnerSale {
  @Field()
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  royalty: number;

  @Field()
  price: number;

  @Field()
  courseId: string;

  @Field()
  bundleId: string;

  @Field()
  isCoupon: boolean;
}

@ObjectType()
class PageInfo {
  @Field()
  total: number;
}

@ObjectType()
class PartnerSaleConnection {
  @Field((type) => [PartnerSale])
  edges: PartnerSale[];

  @Field()
  pageInfo: PageInfo;
}

@ObjectType()
export class PartnerPayment {
  @Field()
  createdAt: Date;

  @Field()
  royalty: number;
}
@Resolver()
export default class PartnerResolver {
  @Query(() => [VisitorByDay])
  @UseMiddleware(isAuthenticated, isPartner)
  async partnerVisitors(
    @Arg('from') from: Date,
    @Arg('to') to: Date,
    @Ctx() ctx: ResolverContext
  ): Promise<VisitorByDay[]> {
    try {
      return await ctx.partnerConnector.getVisitorsBetweenAggregatedByDate(
        from,
        to
      );
    } catch (error) {
      return [];
    }
  }

  @Query(() => PartnerSaleConnection)
  @UseMiddleware(isAuthenticated, isPartner)
  async partnerSales(
    @Arg('offset') offset: number,
    @Arg('limit') limit: number,
    @Ctx() ctx: ResolverContext
  ): Promise<PartnerSaleConnection> {
    try {
      const { edges, total } =
        await ctx.partnerConnector.getSalesByPartner(
          ctx.me!.uid,
          offset,
          limit
        );

      return {
        edges: edges.map((saleByPartner) => ({
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
      throw new Error(error);
    }
  }

  @Query(() => [PartnerPayment])
  @UseMiddleware(isAuthenticated, isPartner)
  async partnerPayments(
    @Ctx() ctx: ResolverContext
  ): Promise<PartnerPayment[]> {
    try {
      return await ctx.partnerConnector.getPaymentsByPartner(
        ctx.me!.uid
      );
    } catch (error) {
      return [];
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthenticated, isAdmin)
  async promoteToPartner(
    @Arg('uid') uid: string,
    @Ctx() ctx: ResolverContext
  ): Promise<Boolean> {
    try {
      await ctx.adminConnector.setCustomClaims(uid, {
        partner: true,
      });
    } catch (error) {
      throw new Error(error);
    }

    return true;
  }

  @Mutation(() => Boolean)
  async partnerTrackVisitor(
    @Arg('partnerId') partnerId: string,
    @Ctx() ctx: ResolverContext
  ): Promise<Boolean> {
    try {
      const partner = await ctx.adminConnector.getUser(partnerId);

      if (!hasPartnerRole(partner)) {
        return false;
      }
    } catch (error) {
      return false;
    }

    try {
      await ctx.partnerConnector.createVisitor(partnerId);
    } catch (error) {
      return false;
    }

    return true;
  }
}
