import { useState } from "react";
import { LuPencil as EditIcon } from "react-icons/lu";
import Avatar from "../../components/Avatar";
import RatingStars from "../RatingStars";

const TripAuthorReviewSection = ({
  trip,
  isEditable = false,
  onReviewSave,
}) => {
  const [editingOverview, setEditingOverview] = useState(false);
  const [overviewInput, setOverviewInput] = useState(
    trip.creatorOverview || "",
  );
  const [ratingInput, setRatingInput] = useState(trip.creatorRating || 0);

  const handleSaveOverview = async () => {
    const success = await onReviewSave({
      creatorOverview: overviewInput,
      creatorRating: ratingInput,
    });

    if (success) {
      setEditingOverview(false);
    }
  };

  return (
    <section className="trip-author-review-section mb-16 p-12 mt-16 rounded-lg border border-border">
      <div className="flex items-center justify-between mb-8">
        <h4 className="review-section-title text-2xl font-semibold">
          Overall Trip Review
        </h4>
        {isEditable && !editingOverview && (
          <button
            onClick={() => setEditingOverview(true)}
            className="p-2 bg-accent text-white rounded-full"
          >
            <EditIcon />
          </button>
        )}
      </div>

      {isEditable && editingOverview ? (
        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">Rating (1-5)</label>
            <RatingStars rating={ratingInput} onRate={setRatingInput} />
          </div>

          <div>
            <label className="block mb-2 font-medium">Your Review</label>
            <textarea
              value={overviewInput}
              onChange={(e) => setOverviewInput(e.target.value)}
              className="w-full p-3 border border-border rounded-lg min-h-[150px] focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent bg-white"
              placeholder="Share your thoughts about this trip..."
            />
          </div>

          <div className="flex gap-2 justify-end">
            <button
              onClick={handleSaveOverview}
              className="px-4 py-2 bg-accent text-white rounded-lg"
            >
              Save Review
            </button>
            <button
              onClick={() => {
                setEditingOverview(false);
                setOverviewInput(trip.creatorOverview || "");
                setRatingInput(trip.creatorRating || 0);
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {/* Trip Author info */}
          <div className="flex items-center gap-4">
            <Avatar size="large" src={trip.user?.profileImageUrl} />
            <div>
              <h3 className="font-medium">
                {trip.user
                  ? `${trip.user.name || ""} ${trip.user.surname || ""}`.trim() ||
                    "Unknown Author"
                  : "Unknown Author"}
              </h3>
            </div>
          </div>

          {/* Rating stars */}
          {trip.creatorRating > 0 && (
            <div className="mb-4">
              <RatingStars rating={trip.creatorRating} />
            </div>
          )}

          {trip.creatorOverview ? (
            <p className="text-gray-700">{trip.creatorOverview}</p>
          ) : (
            <p className="text-gray-500 italic">
              {isEditable
                ? "No review yet. Click the edit button to add your review."
                : "No review available."}
            </p>
          )}
        </div>
      )}
    </section>
  );
};

export default TripAuthorReviewSection;
