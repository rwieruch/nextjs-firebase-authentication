import { MutationResolvers } from '@generated/server';

interface Resolvers {
  Mutation: MutationResolvers;
}

export const resolvers: Resolvers = {
  Mutation: {
    migrate: async (_, { migrationType }) => {
      switch (migrationType) {
        case 'FOO':
          return true;
        case 'BAR':
          return true;
        default:
          return false;
      }
    },
  },
};
