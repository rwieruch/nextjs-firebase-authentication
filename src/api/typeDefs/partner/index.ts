import { gql } from 'apollo-server-micro';

export default gql`
  extend type Query {
    partnerGetVisitors(
      from: DateTime!
      to: DateTime!
    ): [VisitorByDay!]!
  }

  extend type Mutation {
    promoteToPartner(uid: String!): Boolean

    partnerTrackVisitor(partnerId: String!): Boolean
  }

  type VisitorByDay {
    date: DateTime!
    count: Int!
  }
`;
