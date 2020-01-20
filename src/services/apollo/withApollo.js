import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import withApollo from 'next-with-apollo';
import Router from 'next/router';

import * as ROUTES from '@constants/routes';

const httpLink = new HttpLink({
  uri: `${process.env.BASE_URL}/api/graphql`,
  credentials: 'same-origin',
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(
      ({ message, extensions, locations, path }) => {
        console.log('GraphQL error:', message);

        if (extensions.code === 'UNAUTHENTICATED') {
          console.log('push');
          Router.push(ROUTES.SIGN_IN);
          // signOut(client);
        }
      }
    );
  }

  if (networkError) {
    console.log('Network error', networkError);

    if (networkError.statusCode === 401) {
      Router.push(ROUTES.SIGN_IN);
      // signOut(client);
    }
  }
});

export default withApollo(
  ({ ctx, headers, initialState }) =>
    new ApolloClient({
      link: errorLink.concat(httpLink),
      request: operation => {
        operation.setContext({
          fetchOptions: {
            credentials: 'include',
          },
          headers,
        });
      },
      cache: new InMemoryCache().restore(initialState || {}),
    })
);
