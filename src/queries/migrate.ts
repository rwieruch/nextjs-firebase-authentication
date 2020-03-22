import gql from 'graphql-tag';

export const MIGRATE = gql`
  mutation Migrate($migrationType: String!) {
    migrate(migrationType: $migrationType)
  }
`;
