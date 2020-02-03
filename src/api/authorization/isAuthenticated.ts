import { ForbiddenError } from 'apollo-server';
import { skip } from 'graphql-resolvers';

export const isAuthenticated = (
  parent: any,
  args: any,
  { me }: any
) => (me ? skip : new ForbiddenError('Not authenticated as user.'));
