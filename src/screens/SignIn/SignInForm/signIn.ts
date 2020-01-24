import { ApolloClient } from 'apollo-client';
import gql from 'graphql-tag';
import cookie from 'js-cookie';

import { EXPIRES_IN } from '@constants/cookie';

export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      sessionToken
    }
  }
`;

export default async (
  apolloClient: ApolloClient<any>,
  email: string,
  password: string
) => {
  // TODO
  // const csrfToken = getCookie('csrfToken'); // https://firebase.google.com/docs/auth/admin/manage-cookies#sign_in

  const { data } = await apolloClient.mutate({
    mutation: SIGN_IN,
    variables: {
      email,
      password,
    },
  });

  cookie.set('session', data.signIn.sessionToken, {
    expires: EXPIRES_IN,
    // TODO: 1) Get it work with httpOnly 2) Get it work on the server. See SignUpForm.tsx
    // httpOnly: true,
    // secure: true,
  });
};
