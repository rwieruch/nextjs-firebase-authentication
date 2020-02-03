import { ApolloServer } from 'apollo-server-micro';
import { mergeSchemas } from 'graphql-tools';
import cors from 'micro-cors';

import { ResolverContext } from '@typeDefs/resolver';
import { Resolvers } from '@generated/gen-types';
import typeDefs from '@api/typeDefs';
import resolvers from '@api/resolvers';
import getMe from '@api/middleware/getMe';
import firebaseAdmin from '@services/firebase/admin';

if (process.env.FIREBASE_ADMIN_UID) {
  firebaseAdmin
    .auth()
    .setCustomUserClaims(process.env.FIREBASE_ADMIN_UID, {
      admin: true,
    });
}

const schema = mergeSchemas({
  schemas: typeDefs,
  resolvers: resolvers as Resolvers,
});

const apolloServer = new ApolloServer({
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
