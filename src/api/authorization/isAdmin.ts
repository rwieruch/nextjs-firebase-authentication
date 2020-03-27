import { rule } from 'graphql-shield';
import { ForbiddenError } from 'apollo-server';

import * as ROLES from '@constants/roles';

export const isAdmin = rule()(async (parent, args, { me }) => {
  return me?.customClaims[ROLES.ADMIN]
    ? true
    : new ForbiddenError('No admin user.');
});
