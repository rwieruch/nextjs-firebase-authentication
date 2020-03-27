import { QueryResolvers } from '@generated/server';

interface Resolvers {
  Query: QueryResolvers;
}

export const resolvers: Resolvers = {
  Query: {
    me: (parent, args, { me }) => {
      const rolesObject = me?.customClaims || {};
      const roles = Object.keys(rolesObject).filter(
        key => rolesObject[key]
      );

      return {
        email: me?.email,
        uid: me?.uid,
        username: me?.displayName,
        roles,
      };
    },
  },
};
