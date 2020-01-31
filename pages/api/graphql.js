import { ApolloServer } from 'apollo-server-micro';
import cors from 'micro-cors';

import typeDefs from '@api/typeDefs';
import resolvers from '@api/resolvers';
import getMe from '@api/middleware/getMe';
import firebase from '@services/firebase/client';
import firebaseAdmin from '@services/firebase/admin';

firebaseAdmin
  .auth()
  .setCustomUserClaims(process.env.FIREBASE_ADMIN_UID, {
    admin: true,
  });

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }) => {
    const me = await getMe(req, res, firebaseAdmin);

    return {
      req,
      res,
      firebaseAdmin,
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
