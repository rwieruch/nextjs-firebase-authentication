import { rule } from 'graphql-shield';
import { ForbiddenError } from 'apollo-server';

export const isAuthenticated = rule()(
  async (parent, args, { me }) => {
    return me
      ? true
      : new ForbiddenError('Not authenticated as user.');
  }
);
