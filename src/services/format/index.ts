export const upperSnakeCaseToKebabCase = (string: string) =>
  string.toLowerCase().replace(/_/g, '-');

export const kebabCaseToUpperSnakeCase = (string: string) =>
  string.toUpperCase().replace(/-/g, '_');

export const formatPrice = (price: number) =>
  (price / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

export const formatRouteQuery = (queryValue: string | string[]) =>
  queryValue instanceof Array ? queryValue.join('') : queryValue;
