import { ApolloServer } from 'apollo-server-micro';
import * as firebase from 'firebase-admin';
import cors from 'micro-cors';

import typeDefs from '@api/typeDefs';
import resolvers from '@api/resolvers';
import getMe from '@api/middleware/getMe';

import firebaseServiceAccountKey from '../../firebaseServiceAccountKey.json';

if (!firebase.apps.length) {
  firebase.initializeApp({
    credential: firebase.credential.cert(firebaseServiceAccountKey),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }) => {
    const me = await getMe(req, res, firebase);

    return {
      req,
      res,
      firebase,
      me,
    };
  },
});

const withCors = cors({
  origin: '*',
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default withCors(
  apolloServer.createHandler({
    path: '/api/graphql',
  })
);
