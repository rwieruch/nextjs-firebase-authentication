import { rule } from 'graphql-shield';
import { ForbiddenError } from 'apollo-server';

export const isAdmin = rule()(async (parent, args, { me }) => {
  return me?.customClaims?.admin
    ? true
    : new ForbiddenError('No admin user.');
});
