import { mergeSchemas } from 'graphql-tools';
import { applyMiddleware } from 'graphql-middleware';

import { Resolvers } from '@generated/gen-types';

import authorization from '@api/authorization';
import typeDefs from '@api/typeDefs';
import resolvers from '@api/resolvers';

const schema = mergeSchemas({
  schemas: typeDefs,
  resolvers: resolvers as Resolvers,
});

export default applyMiddleware(schema, authorization);
