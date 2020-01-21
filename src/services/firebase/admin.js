import * as firebaseAdmin from 'firebase-admin';

import firebaseServiceAccountKey from '../../../firebaseServiceAccountKey.json';

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(
      firebaseServiceAccountKey
    ),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

export default firebaseAdmin;
