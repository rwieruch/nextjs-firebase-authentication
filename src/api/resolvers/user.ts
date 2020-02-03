import { combineResolvers } from 'graphql-resolvers';

import { QueryResolvers } from '@generated/gen-types';
import { isAuthenticated } from '@api/authorization/isAuthenticated';

interface Resolvers {
  Query: QueryResolvers;
}

export const resolvers: Resolvers = {
  Query: {
    me: combineResolvers(isAuthenticated, (parent, args, { me }) => {
      return {
        email: me?.email,
        uid: me?.uid,
      };
    }),
  },
};
