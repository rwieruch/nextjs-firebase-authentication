import { MiddlewareFn } from 'type-graphql';
import { ForbiddenError } from 'apollo-server';

import { ResolverContext } from '@typeDefs/resolver';
import { hasPartnerRole } from '@validation/partner';

export const isPartner: MiddlewareFn<ResolverContext> = async (
  { context },
  next
) => {
  if (!context.me) {
    throw new ForbiddenError('Not authenticated as user.');
  }

  if (!hasPartnerRole(context.me)) {
    throw new Error('No partner user.');
  }

  return next();
};
