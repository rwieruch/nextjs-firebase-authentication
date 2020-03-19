export const formatPrice = (price: number) =>
  (price / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
