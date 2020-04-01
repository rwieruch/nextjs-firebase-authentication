import * as ROLES from '@constants/roles';
import { Me } from '@typeDefs/me';

export const hasPartnerRole = (user: Me) =>
  user && user.customClaims && user.customClaims[ROLES.PARTNER];
