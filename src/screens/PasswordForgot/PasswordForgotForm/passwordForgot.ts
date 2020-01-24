import { ApolloClient } from 'apollo-client';
import gql from 'graphql-tag';

export const PASSWORD_FORGOT = gql`
  mutation PasswordForgot($email: String!) {
    passwordForgot(email: $email)
  }
`;

export default async (
  apolloClient: ApolloClient<any>,
  email: string
) => {
  // TODO
  // const csrfToken = getCookie('csrfToken'); // https://firebase.google.com/docs/auth/admin/manage-cookies#sign_in

  await apolloClient.mutate({
    mutation: PASSWORD_FORGOT,
    variables: {
      email,
    },
  });
};
