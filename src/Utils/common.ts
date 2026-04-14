const DAY_NAMES = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
]

const MONTH_NAMES = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
]

/**
 * Given a date, gets the name of the day for that date.
 * E.g. when called on a Friday, it returns "friday".
 * @param date A date may be provided as input. If none is provided, use the current date.
 */
export const getDayName = (date = new Date()) => DAY_NAMES[date.getDay()]

/**
 * Given a date, gets the name of the month for that date.
 * E.g. when called in September, it returns "september".
 * @param date @param date A date may be provided as input. If none is provided, use the current date.
 */
export const getMonthName = (date = new Date()) => MONTH_NAMES[date.getMonth()]

/**
 * Given a date, gets the numbered day of the month for that date.
 * E.g. when called on May 3rd, it returns 3.
 * @param date @param date A date may be provided as input. If none is provided, use the current date.
 */
export const getDayOfMonth = (date = new Date()) => date.getDate()

/**
 * Formats a number with commas as thousand separators.
 * E.g. 1234.56 becomes "1,234.56"
 * @param number The number to format
 * @param decimalPlaces Optional number of decimal places (defaults to 2)
 */
export const formatNumberWithCommas = (
  number: number,
  decimalPlaces = 2
): string => {
  return number.toFixed(decimalPlaces).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
