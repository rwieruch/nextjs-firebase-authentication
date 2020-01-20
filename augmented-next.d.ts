import 'next';
import { ApolloClient } from 'apollo-client';

declare module 'next' {
  export interface NextPageContext {
    apolloClient: ApolloClient<any>;
  }
}

// type NextAuthPage = NextPage<DashboardPageProps> & {
//   isAuthorized: Function;
// };
