import { ForbiddenError } from 'apollo-server';
import { skip } from 'graphql-resolvers';

import { ResolverContext } from '@typeDefs/resolver';

export const isAuthenticated = (
  _: any,
  __: any,
  { me }: ResolverContext
) => (me ? skip : new ForbiddenError('Not authenticated as user.'));
