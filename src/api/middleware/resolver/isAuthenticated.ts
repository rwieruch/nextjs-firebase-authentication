import { MiddlewareFn } from 'type-graphql';
import { ForbiddenError } from 'apollo-server';

import type { ResolverContext } from '@typeDefs/resolver';

export const isAuthenticated: MiddlewareFn<ResolverContext> = async (
  { context },
  next
) => {
  if (!context.me) {
    throw new ForbiddenError('Not authenticated as user.');
  }

  return next();
};
