import { MutationResolvers } from '@generated/server';
import { inviteToSlack } from '@services/slack';

interface Resolvers {
  Mutation: MutationResolvers;
}

export const resolvers: Resolvers = {
  Mutation: {
    communityJoin: async (_, { email }) => {
      try {
        const result = await inviteToSlack(email);

        if (!result) {
          return new Error('Something went wrong.');
        }

        if (!result.data.ok) {
          return new Error(result.data.error);
        }
      } catch (error) {
        return new Error(error);
      }

      return true;
    },
  },
};
