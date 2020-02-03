/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SignUp
// ====================================================

export interface SignUp_signUp {
  __typename: "SessionToken";
  sessionToken: string;
}

export interface SignUp {
  signUp: SignUp_signUp;
}

export interface SignUpVariables {
  username: string;
  email: string;
  password: string;
}
