import { gql } from 'apollo-server-micro';

export default gql`
  extend type Query {
    partnerGetVisitors(
      from: DateTime!
      to: DateTime!
    ): [VisitorByDay!]!

    partnerGetSales: [PartnerCourse!]!
  }

  extend type Mutation {
    promoteToPartner(uid: String!): Boolean

    partnerTrackVisitor(partnerId: String!): Boolean
  }

  type VisitorByDay {
    date: DateTime!
    count: Int!
  }

  type PartnerCourse {
    id: String!
    createdAt: DateTime!
    royalty: Int!
    price: Int!
    courseId: CourseId!
    bundleId: BundleId!
    isCoupon: Boolean!
  }
`;
