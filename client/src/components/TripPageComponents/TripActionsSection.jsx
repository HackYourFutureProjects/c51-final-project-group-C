import {
  LuSave as SaveIcon,
  LuCheck as PublishIcon,
  LuUndo as UnpublishIcon,
  LuTrash2 as DeleteIcon,
  LuCopy as CopyIcon,
  LuPencil as EditIcon,
  LuBookmark as BookmarkIcon,
  LuBookmarkMinus as BookmarkRemoveIcon,
} from "react-icons/lu";
import TripActionButton from "../../components/TripActionButton";

const TripActionsSection = ({
  isPublished = false,
  isEditable = false,
  isOwner = false,
  isBookmarked = false,
  onSave,
  onPublish,
  onUnpublish,
  onDelete,
  onCopy,
  onEdit,
  onBookmarkToggle,
}) => {
  return (
    <section className="trip-actions flex flex-col sm:flex-row gap-3 mb-8 w-full">
      {isEditable && (
        <div className="flex-1">
          <TripActionButton
            icon={SaveIcon}
            label="Save Changes"
            onClick={onSave}
            isPrimary={false}
          />
        </div>
      )}

      {!isEditable && isOwner && (
        <div className="flex-1">
          <TripActionButton
            icon={EditIcon}
            label="Edit"
            onClick={onEdit}
            isPrimary={true}
          />
        </div>
      )}

      {isOwner && isPublished ? (
        <div className="flex-1">
          <TripActionButton
            icon={UnpublishIcon}
            label="Unpublish"
            onClick={onUnpublish}
            isPrimary={false}
          />
        </div>
      ) : isOwner && !isPublished ? (
        <div className="flex-1">
          <TripActionButton
            icon={PublishIcon}
            label="Publish"
            onClick={onPublish}
            isPrimary={true}
          />
        </div>
      ) : null}

      {isOwner && (
        <div className="flex-1">
          <TripActionButton
            icon={DeleteIcon}
            label="Delete"
            onClick={onDelete}
            isPrimary={false}
          />
        </div>
      )}

      {!isOwner && (
        <div className="flex-1">
          <TripActionButton
            icon={CopyIcon}
            label="Copy Trip"
            onClick={onCopy}
            isPrimary={true}
          />
        </div>
      )}

      {!isOwner && isPublished && onBookmarkToggle && (
        <div className="flex-1">
          <TripActionButton
            icon={isBookmarked ? BookmarkRemoveIcon : BookmarkIcon}
            label={isBookmarked ? "Remove from Bookmarks" : "Add to Bookmarks"}
            onClick={onBookmarkToggle}
            isPrimary={false}
          />
        </div>
      )}
    </section>
  );
};

export default TripActionsSection;
