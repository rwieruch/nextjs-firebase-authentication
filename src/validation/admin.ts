import * as ROLES from '@constants/roles';
import { User } from '@typeDefs/user';

export const hasAdminRole = (user: User | null | undefined) =>
  user && user.customClaims && user.customClaims[ROLES.ADMIN];
