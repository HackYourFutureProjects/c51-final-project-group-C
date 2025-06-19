import { formatDistanceToNow } from "date-fns";

// 👇 This to show the relative date format of published trip (e.g. '2 days ago', '3 months ago' etc.)
export const turnDateStringToRelativeFormat = (dateString) => {
  const date = new Date(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
};

// 👇 To build a good looking location name from Nominatim API response, instead of using display_name which is overdetailed
export const formatLocation = (item) => {
  const address = item.address || {};
  let mainName = item.name || "";

  const addressParts = [];

  if (address.road) {
    let streetAddress = address.road;
    if (address.house_number) streetAddress += ` ${address.house_number}`;
    addressParts.push(streetAddress);
  }

  const cityName = address.city || address.town || address.village || "";
  const countryName = address.country || "";

  if (cityName) addressParts.push(cityName);
  if (countryName) addressParts.push(countryName);

  if (!mainName && addressParts.length === 0) {
    return item.display_name.length > 50
      ? item.display_name.substring(0, 50) + "..."
      : item.display_name;
  }

  return [mainName, ...addressParts].filter(Boolean).join(", ");
};

// 👇 Helper function needed to instantly update the city in the TripPage without reloading

export function getUniqueCitiesFromDays(days) {
  const citiesSet = new Set();

  days.forEach((day) => {
    day.activities?.forEach((activity) => {
      const city = activity.location?.city;
      if (city) {
        citiesSet.add(city);
      }
    });
  });

  return Array.from(citiesSet);
}
