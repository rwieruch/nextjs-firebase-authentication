import { gql } from 'apollo-server-micro';

export default gql`
  extend type Query {
    partnerGetVisitors(
      from: DateTime!
      to: DateTime!
    ): [VisitorByDay!]!

    partnerSales(offset: Int!, limit: Int!): PartnerSaleConnection!
  }

  extend type Mutation {
    promoteToPartner(uid: String!): Boolean

    partnerTrackVisitor(partnerId: String!): Boolean
  }

  type VisitorByDay {
    date: DateTime!
    count: Int!
  }

  type PartnerSaleConnection {
    edges: [PartnerSale!]!
    pageInfo: PageInfo!
  }

  type PageInfo {
    total: Int!
  }

  type PartnerSale {
    id: String!
    createdAt: DateTime!
    royalty: Int!
    price: Int!
    courseId: CourseId!
    bundleId: BundleId!
    isCoupon: Boolean!
  }
`;
