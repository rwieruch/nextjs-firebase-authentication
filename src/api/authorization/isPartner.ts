import { rule } from 'graphql-shield';
import { ForbiddenError } from 'apollo-server';

import { hasPartnerRole } from '@validation/partner';

export const isPartner = rule()(async (_, __, { me }) => {
  if (!me) {
    return new ForbiddenError('Not authenticated as user.');
  }

  return hasPartnerRole(me)
    ? true
    : new ForbiddenError('No partner user.');
});
