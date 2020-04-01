import { gql } from 'apollo-server-micro';

export default gql`
  extend type Query {
    partnerVisitors(from: DateTime!, to: DateTime!): [VisitorByDay!]!
    partnerSales(offset: Int!, limit: Int!): PartnerSaleConnection!
    partnerPayments: [PartnerPayment!]!
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

  type PartnerSale {
    id: String!
    createdAt: DateTime!
    royalty: Int!
    price: Int!
    courseId: CourseId!
    bundleId: BundleId!
    isCoupon: Boolean!
  }

  type PartnerPayment {
    createdAt: DateTime!
    royalty: Int!
  }

  type PageInfo {
    total: Int!
  }
`;
