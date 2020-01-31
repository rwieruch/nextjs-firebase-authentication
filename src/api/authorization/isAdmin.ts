import { ForbiddenError } from 'apollo-server';
import { skip } from 'graphql-resolvers';

import { ResolverContext } from '@typeDefs/resolver';

export const isAdmin = (_: any, __: any, { me }: ResolverContext) =>
  me.claims.admin ? skip : new ForbiddenError('No admin user.');
