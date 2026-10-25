/**
 * Formats a numeric price into a currency string or 'Price on Request'.
 */
export function formatPrice(price?: number | null, isPriceOnRequest?: boolean, currency = 'Rs. '): string {
  if (isPriceOnRequest || price === undefined || price === null || price <= 0) {
    return 'Price on Request';
  }
  return `${currency}${Number(price).toLocaleString('en-IN')}`;
}
