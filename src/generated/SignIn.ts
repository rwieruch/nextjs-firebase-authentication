/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SignIn
// ====================================================

export interface SignIn_signIn {
  __typename: "SessionToken";
  sessionToken: string;
}

export interface SignIn {
  signIn: SignIn_signIn;
}

export interface SignInVariables {
  email: string;
  password: string;
}
