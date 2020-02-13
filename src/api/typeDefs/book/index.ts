import { gql } from 'apollo-server-micro';

export default gql`
  extend type Query {
    book(path: String!, fileName: String!): File!

    onlineChapter(path: String!): Markdown!
  }

  type File {
    fileName: String!
    contentType: String!
    body: String!
  }

  type Markdown {
    body: String!
  }
`;
