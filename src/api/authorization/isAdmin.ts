import { rule } from 'graphql-shield';
import { ForbiddenError } from 'apollo-server';

import { hasAdminRole } from '@validation/admin';

export const isAdmin = rule()(async (_, __, { me }) => {
  if (!me) {
    return new ForbiddenError('Not authenticated as user.');
  }

  return hasAdminRole(me)
    ? true
    : new ForbiddenError('No admin user.');
});
