import { Cart } from '@repo/interfaces/cart';

/**
 * Formats a number into a localized string with appropriate decimal places.
 *
 * - If the number is an integer, it returns the number with thousands separators (e.g., 1000 -> "1,000").
 * - If the number is a float, it formats it to 2 decimal places (e.g., 1234.5 -> "1,234.50").
 * - If the number is falsy (e.g., 0, null, undefined), it returns 0.
 *
 * @param number - The numeric value to format
 * @returns A formatted string or 0
 */
export const formatAmount = (number: number) => {
  if (number) {
    if (Number.isInteger(number)) {
      return number.toLocaleString('en-US');
    } else {
      return number.toLocaleString('en-US', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      });
    }
  }
  return 0;
};

/**
 * Flattens paginated data into a single array.
 *
 * - Useful for infinite queries or paginated API responses.
 * - Accepts an array of pages (e.g., [[...], [...], ...]) and flattens them into a single array.
 *
 * @template T - The type of items in the pages
 * @param pages - An array of arrays (pages) containing items of type T
 * @returns A flat array of all items from all pages
 */
export const getData = <T>(pages = []) => {
  let result: T[] = [];

  pages?.map(item => {
    result = result.concat(item);
  });

  return result;
};

/**
 * Converts an object of filters into a URL query string.
 *
 * - Filters out keys with `undefined`, `null`, or empty string values.
 * - Trims string values and URL-encodes both keys and values.
 *
 * @param filters - An object containing key-value pairs to be serialized into a query string
 * @returns A query string (e.g., "key1=value1&key2=value2")
 */
export const getQueryString = (filters: object = {}): string =>
  Object.entries(filters)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(
      ([k, v]) =>
        `${encodeURIComponent(k)}=${encodeURIComponent(
          typeof v === 'string' ? v.trim() : v,
        )}`,
    )
    .join('&');

/**
 * Calculates the total price of checked items in the cart.
 *
 * - Filters cart items where `isChecked` is true.
 * - Multiplies each item's price by its quantity and sums the total.
 * - Formats the total amount as a localized string.
 *
 * @param carts - Array of cart items
 * @returns Formatted total price as a string
 */
export const calcTotalPrice = (carts: Cart[]) => {
  const total = carts
    .filter(c => c.isChecked)
    .reduce((sum, c) => sum + c.product.price * c.quantity, 0);

  return formatAmount(total);
};
