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

export const GET_ONLINE_CHAPTER = gql`
  query GetOnlineChapter($path: String!) {
    onlineChapter(path: $path) {
      body
    }
  }
`;
