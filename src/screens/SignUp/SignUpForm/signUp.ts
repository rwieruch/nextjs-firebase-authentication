import { ApolloClient } from 'apollo-client';
import gql from 'graphql-tag';

const SIGN_UP = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password)
  }
`;

export default async (
  apolloClient: ApolloClient<any>,
  username: string,
  email: string,
  password: string
) => {
  // TODO
  // const csrfToken = getCookie('csrfToken'); // https://firebase.google.com/docs/auth/admin/manage-cookies#sign_in

  await apolloClient.mutate({
    mutation: SIGN_UP,
    variables: {
      username,
      email,
      password,
    },
  });
};
