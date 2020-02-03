import * as firebaseAdminVanilla from 'firebase-admin';

type Claims = {
  admin?: boolean;
};

type AdminUser = {
  customClaims: Claims;
};

export type Me = firebaseAdminVanilla.auth.UserRecord & AdminUser;
