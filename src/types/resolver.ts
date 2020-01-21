import * as firebase from 'firebase/app';
import * as firebaseAdmin from 'firebase-admin';

import { Me } from '@typeDefs/me';

export type ResolverContext = {
  me: Me;
  firebaseAdmin: firebaseAdmin.app.App;
  firebase: firebase.app.App;
};
