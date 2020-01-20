import Router from 'next/router';
import cookie from 'js-cookie';

import { ServerRequest, ServerResponse } from '@typeDefs/server';
import * as ROUTES from '@constants/routes';
import firebase from '@services/firebase';

export default (req?: ServerRequest, res?: ServerResponse) => {
  const isServer = req || res;

  firebase.auth().signOut();

  if (isServer) {
    res?.writeHead(302, { Location: ROUTES.SIGN_IN });
    res?.end();
  } else {
    Router.push(ROUTES.SIGN_IN);
    cookie.remove('session');
  }
};
