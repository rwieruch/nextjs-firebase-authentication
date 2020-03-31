import gql from 'graphql-tag';

export const PROMOTE_TO_PARTNER = gql`
  mutation PromoteToPartner($uid: String!) {
    promoteToPartner(uid: $uid)
  }
`;

export const PARTNER_TRACK_VISITOR = gql`
  mutation PartnerTrackVisitor($partnerId: String!) {
    partnerTrackVisitor(partnerId: $partnerId)
  }
`;

export const PARTNER_GET_VISITORS = gql`
  query PartnerGetVisitors($from: DateTime!, $to: DateTime!) {
    partnerGetVisitors(from: $from, to: $to) {
      date
      count
    }
  }
`;

export const PARTNER_SALES = gql`
  query PartnerSales($offset: Int!, $limit: Int!) {
    partnerSales(offset: $offset, limit: $limit) {
      edges {
        id
        royalty
        price
        createdAt
        courseId
        bundleId
        isCoupon
      }
      pageInfo {
        total
      }
    }
  }
`;
