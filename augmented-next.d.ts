import 'next';
import ApolloClient from 'apollo-boost';

declare module 'next' {
  export interface NextPageContext {
    apolloClient: ApolloClient<any>;
  }
}

// type NextAuthPage = NextPage<DashboardPageProps> & {
//   isAuthorized: Function;
// };
