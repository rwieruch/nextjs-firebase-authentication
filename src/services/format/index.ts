export const upperSnakeCaseToKebabCase = (string: string) =>
  string.toLowerCase().replace(/_/g, '-');

export const kebabCaseToUpperSnakeCase = (string: string) =>
  string.toUpperCase().replace(/-/g, '_');

export const formatPrice = (price: number) =>
  (price / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

export const formatDateTime = (date: Date) =>
  new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  }).format(date);

export const formatMonth = (date: Date) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'long',
  }).format(date);

export const formatRouteQuery = (queryValue: string | string[]) =>
  queryValue instanceof Array ? queryValue.join('') : queryValue;
