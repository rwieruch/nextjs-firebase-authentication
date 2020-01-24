/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMeAccount
// ====================================================

export interface GetMeAccount_me {
  __typename: "User";
  email: string;
  uid: string;
}

export interface GetMeAccount {
  me: GetMeAccount_me | null;
}
