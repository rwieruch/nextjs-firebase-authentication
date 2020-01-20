import * as firebase from 'firebase-admin';

import { Me } from '@typeDefs/me';

export type ResolverContext = {
  me: Me;
  firebase: firebase.app.App;
};
