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

export const PARTNER_VISITORS = gql`
  query PartnerVisitors($from: DateTime!, $to: DateTime!) {
    partnerVisitors(from: $from, to: $to) {
      date
      count
    }
  }
`;

export const PARTNER_SALES = gql`
  query PartnerSales($offset: Float!, $limit: Float!) {
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

export const PARTNER_PAYMENTS = gql`
  query PartnerPayments {
    partnerPayments {
      createdAt
      royalty
    }
  }
`;
