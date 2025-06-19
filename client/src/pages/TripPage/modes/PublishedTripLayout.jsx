import { useState } from "react";
import Modal from "../../../components/Modal";
import TripHeaderSection from "../../../components/TripPageComponents/TripHeaderSection";
import TripActionsSection from "../../../components/TripPageComponents/TripActionsSection";
import TripCoverSection from "../../../components/TripPageComponents/TripCoverSection";
import TripDaysSection from "../../../components/TripPageComponents/TripDaysSection";
import TripAuthorReviewSection from "../../../components/TripPageComponents/TripAuthorReviewSection";
import OtherTravelersReviews from "../../../components/TripPageComponents/OtherTravelersReviews";
import SimilarTripsSection from "../../../components/TripPageComponents/SimilarTripsSection";

const PublishedTripLayout = ({
  trip,
  isOwner,
  isBookmarked,
  onCopy,
  onEdit,
  onUnpublish,
  onDelete,
  onBookmarkToggle,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="trip-page mt-10">
      <div className="trip-content max-w-5xl mx-auto px-4 py-8">
        <TripHeaderSection trip={trip} isEditable={false} isOwner={isOwner} />

        <TripActionsSection
          isPublished={trip.isPublished}
          isEditable={false}
          isOwner={isOwner}
          isBookmarked={isBookmarked}
          onCopy={onCopy}
          onEdit={onEdit}
          onUnpublish={onUnpublish}
          onDelete={() => setShowDeleteModal(true)}
          onBookmarkToggle={onBookmarkToggle}
        />

        <TripCoverSection
          coverPhotoUrl={trip.coverPhotoUrl}
          isEditable={false}
        />

        <TripDaysSection days={trip.days} isEditable={false} />

        <TripAuthorReviewSection trip={trip} isEditable={false} />

        <TripActionsSection
          isPublished={trip.isPublished}
          isEditable={false}
          isOwner={isOwner}
          isBookmarked={isBookmarked}
          onCopy={onCopy}
          onEdit={onEdit}
          onUnpublish={onUnpublish}
          onDelete={() => setShowDeleteModal(true)}
          onBookmarkToggle={onBookmarkToggle}
        />

        <OtherTravelersReviews />

        <SimilarTripsSection />
      </div>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Trip"
        body={
          <div className="text-center">
            <p className="mb-4">
              Are you sure you want to delete this trip? This action cannot be
              undone.
            </p>
          </div>
        }
        actionLabel="Delete"
        onSubmit={onDelete}
        secondaryAction={() => setShowDeleteModal(false)}
        secondaryActionLabel="Cancel"
      />
    </div>
  );
};

export default PublishedTripLayout;
