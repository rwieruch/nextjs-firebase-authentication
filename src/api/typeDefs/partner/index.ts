import { gql } from 'apollo-server-micro';

export default gql`
  extend type Mutation {
    promoteToPartner(uid: String!): Boolean

    partnerTrackVisitor(partnerId: String!): Boolean
  }
`;
