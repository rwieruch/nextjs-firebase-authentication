import { AuthenticationError } from 'apollo-server-micro';
import * as firebaseAdminVanilla from 'firebase-admin';

import firebaseAdmin from '@services/firebase/admin';

import { ServerResponse, ServerRequest } from '@typeDefs/server';

type Claims = {
  admin: boolean;
};

type WithClaims = {
  customClaims: Claims;
};

export default async (req: ServerRequest, res: ServerResponse) => {
  const { session } = req.cookies;

  if (!session) {
    return undefined;
  }

  const checkRevoked = true;

  return await firebaseAdmin
    .auth()
    .verifySessionCookie(session, checkRevoked)
    .then(async claims => {
      return (await firebaseAdmin
        .auth()
        .getUser(
          claims.uid
        )) as firebaseAdminVanilla.auth.UserRecord & WithClaims;
    })
    .catch(error => {
      throw new AuthenticationError(error.message);
    });
};
