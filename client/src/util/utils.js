import { formatDistanceToNow } from "date-fns";

// 👇 This to show the relative date format of published trip (e.g. '2 days ago', '3 months ago' etc.)
export const turnDateStringToRelativeFormat = (dateString) => {
  const date = new Date(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
};
