import { AuthenticationError } from 'apollo-server-micro';
import * as firebase from 'firebase-admin';

import { ServerResponse, ServerRequest } from '@typeDefs/server';

export default async (
  req: ServerRequest,
  res: ServerResponse,
  firebase: firebase.app.App
) => {
  const { session } = req.cookies;

  if (!session) {
    return null;
  }

  const checkRevoked = true;

  return await firebase
    .auth()
    .verifySessionCookie(session, checkRevoked)
    .then(decodedClaims => {
      return firebase.auth().getUser(decodedClaims.uid);
    })
    .catch(error => {
      throw new AuthenticationError(error.message);
    });
};
