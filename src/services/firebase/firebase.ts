import app from 'firebase/app';

import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

if (!app.apps.length) {
  app.initializeApp(config);
}

const db = app.database();
const auth = app.auth();
const storage = app.storage();

// TODO
// As httpOnly cookies are to be used, do not persist any state client side.
// firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

export default app;

export { db, auth, storage };
