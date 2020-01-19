import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';

export default withApollo(
  ({ ctx, headers, initialState }) =>
    new ApolloClient({
      uri: `${process.env.BASE_URL}/api/graphql`,
      cache: new InMemoryCache().restore(initialState || {}),
    })
);
