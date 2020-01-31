import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';

import withApollo from 'next-with-apollo';

import signOut from '@components/Navigation/signOut';

const httpLink = new HttpLink({
  uri: `${process.env.BASE_URL}/api/graphql`,
  credentials: 'same-origin',
});

const getErrorLink = (ctx = { req: null, res: null }) =>
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(
        ({ message, extensions, locations, path }) => {
          console.log('GraphQL error:', message, extensions);

          if (extensions.code === 'UNAUTHENTICATED') {
            signOut(ctx.req, ctx.res);
          }

          if (extensions.code === 'FORBIDDEN') {
            signOut(ctx.req, ctx.res);
          }
        }
      );
    }

    if (networkError) {
      console.log('Network error', networkError);

      if (networkError.statusCode === 401) {
        signOut(ctx.req, ctx.res);
      }
    }
  });

export default withApollo(
  ({ ctx, headers, initialState }) =>
    new ApolloClient({
      link: getErrorLink(ctx).concat(httpLink),
      cache: new InMemoryCache().restore(initialState || {}),
    })
);
