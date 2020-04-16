import { ApolloServer } from 'apollo-server-micro';
import { buildSchema } from 'type-graphql';
import { applyMiddleware } from 'graphql-middleware';

import cors from 'micro-cors';

import 'reflect-metadata';

import getConnection from '@models/index';
import { AdminConnector } from '@connectors/admin';
import { PartnerConnector } from '@connectors/partner';
import { CourseConnector } from '@connectors/course';
import { CouponConnector } from '@connectors/coupon';
import { ServerRequest, ServerResponse } from '@typeDefs/server';
import { ResolverContext } from '@typeDefs/resolver';

import resolvers from '@api/resolvers';
import meMiddleware from '@api/middleware/me';
import sentryMiddleware from '@api/middleware/sentry';

import firebaseAdmin from '@services/firebase/admin';

if (process.env.FIREBASE_ADMIN_UID) {
  firebaseAdmin
    .auth()
    .getUser(process.env.FIREBASE_ADMIN_UID)
    .then(user => {
      if (process.env.FIREBASE_ADMIN_UID) {
        firebaseAdmin
          .auth()
          .setCustomUserClaims(process.env.FIREBASE_ADMIN_UID, {
            ...user.customClaims,
            admin: true,
          });
      }
    });
}

const withCors = cors({
  origin: '*',
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: ServerRequest, res: ServerResponse) => {
  const connection = await getConnection();

  const schema = await buildSchema({
    resolvers,
    dateScalarMode: 'isoDate',
  });

  const server = new ApolloServer({
    schema: applyMiddleware(schema, sentryMiddleware, meMiddleware),

    context: async ({ req, res }): Promise<ResolverContext> => {
      const adminConnector = new AdminConnector();
      const partnerConnector = new PartnerConnector(connection!);
      const courseConnector = new CourseConnector(connection!);
      const couponConnector = new CouponConnector(connection!);

      return {
        req,
        res,
        adminConnector,
        courseConnector,
        partnerConnector,
        couponConnector,
      };
    },
  });

  const handler = withCors(
    server.createHandler({ path: '/api/graphql' })
  );

  return handler(req, res);
};
