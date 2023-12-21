import { formatDistanceToNow } from "date-fns";

/**
 * The date to be formatted
 * @param {Date} date
 */
export const formatDateToNow = (date) => {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    includeSeconds: true
  });
};
