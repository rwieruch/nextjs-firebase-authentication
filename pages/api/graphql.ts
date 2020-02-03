import { ApolloServer } from 'apollo-server-micro';
import cors from 'micro-cors';

import { ResolverContext } from '@typeDefs/resolver';
import schema from '@api/schema';
import getMe from '@api/middleware/getMe';
import firebaseAdmin from '@services/firebase/admin';

if (process.env.FIREBASE_ADMIN_UID) {
  firebaseAdmin
    .auth()
    .setCustomUserClaims(process.env.FIREBASE_ADMIN_UID, {
      admin: true,
    });
}

export const apolloServer = new ApolloServer({
  schema,
  context: async ({ req, res }): Promise<ResolverContext> => {
    const me = await getMe(req, res);

    return {
      req,
      res,
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
