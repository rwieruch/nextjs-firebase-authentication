import gql from 'graphql-tag';

export const COMMUNITY_JOIN = gql`
  mutation CommunityJoin($email: String!) {
    communityJoin(email: $email)
  }
`;
