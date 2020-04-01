import { rule } from 'graphql-shield';
import { ForbiddenError } from 'apollo-server';

import * as ROLES from '@constants/roles';

export const isPartner = rule()(async (parent, args, { me }) => {
  if (!me) {
    return new ForbiddenError('Not authenticated as user.');
  }

  return me.customClaims && me.customClaims[ROLES.PARTNER]
    ? true
    : new ForbiddenError('No partner user.');
});
