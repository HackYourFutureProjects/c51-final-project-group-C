import { LuUser as UserIcon } from "react-icons/lu";

const Avatar = ({ size = "large", src, withBorder = false }) => {
  let imageSizeClasses, iconSizeClasses;

  // 👇 Different Tailwind classes will be applied depending on 'size' prop.
  if (size === "small") {
    imageSizeClasses = "w-8 h-8";
    iconSizeClasses = "w-3 h-3";
  } else if (size === "medium") {
    imageSizeClasses = "w-10 h-10";
    iconSizeClasses = "w-4 h-4";
  } else {
    imageSizeClasses = "w-20 h-20";
    iconSizeClasses = "w-8 h-8";
  }

  // 👇 Just to have an option to add border to the avatar.
  const borderClasses = withBorder
    ? "border-2 border-border hover:border-accent"
    : "";

  return (
    <div className="flex items-center justify-center">
      {src ? (
        <img
          src={src}
          alt="user-avatar-image"
          className={`avatar-image ${imageSizeClasses} rounded-full object-cover ${borderClasses}`}
        />
      ) : (
        <div
          className={`${imageSizeClasses} rounded-full bg-border flex items-center justify-center ${borderClasses}`}
        >
          <UserIcon className={`${iconSizeClasses} text-text`} />
        </div>
      )}
    </div>
  );
};

export default Avatar;
