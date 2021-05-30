import { sentry } from 'graphql-middleware-sentry';
import * as Sentry from '@sentry/node';

import type { ResolverContext } from '@typeDefs/resolver';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
});

export default sentry({
  sentryInstance: Sentry,
  config: {
    environment: process.env.NODE_ENV,
  },
  forwardErrors: true,
  captureReturnedErrors: true,
  withScope: (scope, error, context: ResolverContext) => {
    scope.setUser({
      id: context.me?.uid,
      email: context.me?.email,
    });

    scope.setExtra('body', context.req.body);
    scope.setExtra('origin', context.req.headers.origin);
    scope.setExtra('user-agent', context.req.headers['user-agent']);
  },
});
