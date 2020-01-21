import { ApolloClient } from 'apollo-client';
import gql from 'graphql-tag';

const PASSWORD_CHANGE = gql`
  mutation($password: String!) {
    passwordChange(password: $password)
  }
`;

export default async (
  apolloClient: ApolloClient<any>,
  password: string
) => {
  // TODO
  // const csrfToken = getCookie('csrfToken'); // https://firebase.google.com/docs/auth/admin/manage-cookies#sign_in

  await apolloClient.mutate({
    mutation: PASSWORD_CHANGE,
    variables: {
      password,
    },
  });
};
