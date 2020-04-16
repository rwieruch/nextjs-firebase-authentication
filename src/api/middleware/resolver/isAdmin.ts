import { MiddlewareFn } from 'type-graphql';
import { ForbiddenError } from 'apollo-server';

import { ResolverContext } from '@typeDefs/resolver';
import { hasAdminRole } from '@validation/admin';

export const isAdmin: MiddlewareFn<ResolverContext> = async (
  { context },
  next
) => {
  if (!context.me) {
    throw new ForbiddenError('Not authenticated as user.');
  }

  if (!hasAdminRole(context.me)) {
    throw new ForbiddenError('No admin user.');
  }

  return next();
};
