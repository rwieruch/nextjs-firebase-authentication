import gql from 'graphql-tag';

export const PROMOTE_TO_PARTNER = gql`
  mutation PromoteToPartner($uid: String!) {
    promoteToPartner(uid: $uid)
  }
`;
