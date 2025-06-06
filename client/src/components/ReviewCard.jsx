import Avatar from "./Avatar";

const ReviewCard = ({ user, text, avatarSize = "medium" }) => {
  return (
    <div className="review-card p-6 rounded-lg border border-border">
      <div className="flex items-center gap-3 mb-3">
        <Avatar size={avatarSize} />
        <div>
          <h3 className="font-medium">
            {user.name} {user.surname}
          </h3>
          <p className="text-sm text-gray-600">{user.country}</p>
        </div>
      </div>
      <p className="text-gray-700 italic text-sm">&ldquo;{text}&rdquo;</p>
    </div>
  );
};

export default ReviewCard;
