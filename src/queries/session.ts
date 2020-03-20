import gql from 'graphql-tag';

export const SIGN_UP = gql`
  mutation SignUp(
    $username: String!
    $email: String!
    $password: String!
  ) {
    signUp(username: $username, email: $email, password: $password) {
      sessionToken
    }
  }
`;

export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      sessionToken
    }
  }
`;

export const PASSWORD_CHANGE = gql`
  mutation PasswordChange($password: String!) {
    passwordChange(password: $password)
  }
`;

export const PASSWORD_FORGOT = gql`
  mutation PasswordForgot($email: String!) {
    passwordForgot(email: $email)
  }
`;

export const EMAIL_CHANGE = gql`
  mutation EmailChange($email: String!) {
    emailChange(email: $email)
  }
`;
