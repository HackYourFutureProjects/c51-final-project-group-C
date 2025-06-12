// 👇 This component is used to display the profile information in the profile page.
//  We use it both in private and public view of ProfilePage.
// It expects profileInfo object as a prop. For now this object has such structure:
// {  name, surname, country, publishedTripPlans (0 by default), timesCopied (0 by default) }
// Later we will maybe add more fields.

import { LuMapPin as MapPinIcon } from "react-icons/lu";
import Avatar from "./Avatar";

const ProfileInfo = ({ profileInfo }) => {
  const {
    name,
    surname,
    country,
    profileImageUrl,
    publishedTripPlans = 0,
    timesCopied = 0,
  } = profileInfo;

  return (
    <div className="user-info text-center">
      <Avatar size="large" src={profileImageUrl} />
      <h2 className="user-name text-xl font-semibold mt-4">
        {name} {surname}
      </h2>
      <p className="user-location flex items-center justify-center gap-2 mt-2 text-sm">
        <MapPinIcon className="location-icon w-4 h-4" />
        <span>{country || "Country not set"}</span>
      </p>
      <div className="user-stats mt-2 text-xs text-gray-500">
        <p>Published Trips: {publishedTripPlans}</p>
        <p>Times Copied by Others: {timesCopied}</p>
      </div>
    </div>
  );
};

export default ProfileInfo;
