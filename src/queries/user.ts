import gql from 'graphql-tag';

export const GET_ME = gql`
  query GetMe {
    me {
      uid
      email
      username
      roles
    }
  }
`;
