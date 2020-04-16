import { MiddlewareFn } from 'type-graphql';
import { ForbiddenError } from 'apollo-server';

import { ResolverContext } from '@typeDefs/resolver';

export const isAuthenticated: MiddlewareFn<ResolverContext> = async (
  { context },
  next
) => {
  if (!context.me) {
    return new ForbiddenError('Not authenticated as user.');
  }

  return next();
};
