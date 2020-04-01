import * as firebaseAdminVanilla from 'firebase-admin';

type Claims = {
  admin?: boolean;
  role?: boolean;
};

type WithClaims = {
  customClaims?: (Claims & { [key: string]: any }) | undefined;
};

export type Me = firebaseAdminVanilla.auth.UserRecord;
// & WithClaims;
