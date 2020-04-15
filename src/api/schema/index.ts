// import { mergeSchemas } from 'graphql-tools';
// import { applyMiddleware } from 'graphql-middleware';
// import { sentry } from 'graphql-middleware-sentry';
// import * as Sentry from '@sentry/node';

// import { ResolverContext } from '@typeDefs/resolver';

// Sentry.init({
//   dsn: process.env.SENTRY_DSN,
// });

// const sentryMiddleware = sentry({
//   sentryInstance: Sentry,
//   config: {
//     environment: process.env.NODE_ENV,
//   },
//   forwardErrors: true,
//   captureReturnedErrors: true,
//   withScope: (scope, error, context: ResolverContext) => {
//     scope.setUser({
//       id: context.me?.uid,
//       email: context.me?.email,
//     });

//     scope.setExtra('body', context.req.body);
//     scope.setExtra('origin', context.req.headers.origin);
//     scope.setExtra('user-agent', context.req.headers['user-agent']);
//   },
// });

// import { Resolvers } from '@generated/server';

// import authorization from '@api/authorization';
// import typeDefs from '@api/typeDefs';
// import resolvers from '@api/resolvers';

// const schema = mergeSchemas({
//   schemas: typeDefs,
//   resolvers: resolvers as Resolvers,
// });

// export default applyMiddleware(
//   schema,
//   authorization,
//   sentryMiddleware
// );
