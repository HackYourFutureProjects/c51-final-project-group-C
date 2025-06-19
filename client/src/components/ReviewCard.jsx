import Avatar from "./Avatar";

const ReviewCard = ({ user, text, avatarSize = "medium" }) => {
  return (
    <div className="review-card p-6 rounded-lg border border-border">
      <div className="review-card-header flex items-center gap-3 mb-6">
        <Avatar size={avatarSize} src={user?.profileImageUrl} />
        <div>
          <h3 className="font-medium">
            {user?.name || ""} {user?.surname || ""}
          </h3>
          {user?.country && (
            <p className="text-sm text-gray-600">{user.country}</p>
          )}
        </div>
      </div>
      <p className="review-card-text text-gray-700 italic text-sm">
        &ldquo;{text}&rdquo;
      </p>
    </div>
  );
};

export default ReviewCard;
