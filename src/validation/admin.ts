import * as ROLES from '@constants/roles';
import { User } from '@typeDefs/user';

export const hasAdminRole = (user: User) =>
  user && user.customClaims && user.customClaims[ROLES.ADMIN];
