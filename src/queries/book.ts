import gql from 'graphql-tag';

export const GET_BOOK = gql`
  query GetBook($path: String!, $fileName: String!) {
    book(path: $path, fileName: $fileName) {
      body
      contentType
      fileName
    }
  }
`;
