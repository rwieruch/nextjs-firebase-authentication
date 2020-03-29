import { ApolloServer } from 'apollo-server-micro';
import cors from 'micro-cors';

import getConnection from '@models/index';
import { Course } from '@models/course';
import { PartnerVisitor } from '@models/partner';

import { ServerRequest, ServerResponse } from '@typeDefs/server';
import { ResolverContext } from '@typeDefs/resolver';
import schema from '@api/schema';
import getMe from '@api/middleware/getMe';
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

  const server = new ApolloServer({
    schema,
    context: async ({ req, res }): Promise<ResolverContext> => {
      const me = await getMe(req, res);

      return {
        req,
        res,
        me,
        courseRepository: connection!.getRepository(Course),
        partnerVisitorRepository: connection!.getRepository(
          PartnerVisitor
        ),
      };
    },
  });

  const handler = withCors(
    server.createHandler({ path: '/api/graphql' })
  );

  // await connection.close();

  return handler(req, res);
};
