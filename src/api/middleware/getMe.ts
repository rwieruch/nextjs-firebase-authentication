import { AuthenticationError } from 'apollo-server-micro';
import * as firebaseAdmin from 'firebase-admin';

import { ServerResponse, ServerRequest } from '@typeDefs/server';

export default async (
  req: ServerRequest,
  res: ServerResponse,
  firebaseAdmin: firebaseAdmin.app.App
) => {
  const { session } = req.cookies;

  if (!session) {
    return null;
  }

  const checkRevoked = true;

  return await firebaseAdmin
    .auth()
    .verifySessionCookie(session, checkRevoked)
    .then(async claims => {
      const me = await firebaseAdmin.auth().getUser(claims.uid);

      return { ...me, claims };
    })
    .catch(error => {
      throw new AuthenticationError(error.message);
    });
};
