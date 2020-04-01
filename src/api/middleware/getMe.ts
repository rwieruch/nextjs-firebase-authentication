import { AuthenticationError } from 'apollo-server-micro';

import firebaseAdmin from '@services/firebase/admin';

import { ServerResponse, ServerRequest } from '@typeDefs/server';
import { User } from '@typeDefs/user';

export default async (req: ServerRequest, res: ServerResponse) => {
  const { session } = req.cookies;

  if (!session) {
    return undefined;
  }

  const CHECK_REVOKED = true;

  return await firebaseAdmin
    .auth()
    .verifySessionCookie(session, CHECK_REVOKED)
    .then(async claims => {
      return (await firebaseAdmin.auth().getUser(claims.uid)) as User;
    })
    .catch(error => {
      throw new AuthenticationError(error.message);
    });
};
