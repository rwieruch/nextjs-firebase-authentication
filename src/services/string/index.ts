export const upperSnakeCaseToKebabCase = (string: string) =>
  string.toLowerCase().replace(/_/g, '-');

export const kebabCaseToUpperSnakeCase = (string: string) =>
  string.toUpperCase().replace(/-/g, '_');
