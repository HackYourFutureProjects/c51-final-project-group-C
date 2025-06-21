import { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useError } from "../../../context/ErrorContext";
import useImageUpload from "../../../hooks/useImageUpload";
import Modal from "../../../components/Modal";
import TripHeaderSection from "../../../components/TripPageComponents/TripHeaderSection";
import TripActionsSection from "../../../components/TripPageComponents/TripActionsSection";
import TripCoverOrPhotoMapSection from "../../../components/TripPageComponents/TripCoverOrPhotoMapSection";
import TripDaysSection from "../../../components/TripPageComponents/TripDaysSection";
import TripAuthorReviewSection from "../../../components/TripPageComponents/TripAuthorReviewSection";
import { getUniqueCitiesFromDays } from "../../../util/utils";

const EditableTripLayout = ({
  trip,
  isOwner,
  onUpdate,
  onPublish,
  onUnpublish,
  onDelete,
}) => {
  const { tripId } = useParams();

  const [editedTrip, setEditedTrip] = useState(trip);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const api = useFetch();
  const { setServerApiError } = useError();
  const { uploadImage } = useImageUpload();

  const handleTitleSave = async (newTitle) => {
    if (!newTitle.trim()) {
      setServerApiError("Title cannot be empty");
      return false;
    }

    try {
      await api.patch(
        `/trips/${tripId}`,
        { title: newTitle },
        "Updating title...",
      );
      setEditedTrip((prev) => ({ ...prev, title: newTitle }));
      return true;
    } catch (error) {
      console.error("Error updating title:", error);
      return false;
    }
  };

  const handleCoverPhotoUpload = async (file) => {
    if (!file) return;

    try {
      const result = await uploadImage(
        file,
        "tripCover",
        tripId,
        "Uploading cover photo...",
      );
      if (result && result.imageUrls && result.imageUrls.length > 0) {
        const coverPhotoUrl = result.imageUrls[0];
        await api.patch(
          `/trips/${tripId}`,
          { coverPhotoUrl },
          "Updating cover photo...",
        );
        setEditedTrip((prev) => ({ ...prev, coverPhotoUrl }));
      }
    } catch (error) {
      console.error("Error uploading cover photo:", error);
    }
  };

  const handleAddDay = async () => {
    try {
      const newDay = await api.post(
        `/trips/${tripId}/days`,
        {
          title: `Day ${editedTrip.days.length + 1}`,
        },
        "Adding new day...",
      );

      setEditedTrip((prev) => ({
        ...prev,
        days: [...prev.days, newDay],
        duration: prev.days.length + 1,
      }));

      if (onUpdate) {
        onUpdate({
          ...editedTrip,
          days: [...editedTrip.days, newDay],
          duration: editedTrip.days.length + 1,
        });
      }

      return true;
    } catch (error) {
      console.error("Error adding day:", error);
      setServerApiError("Failed to add day");
      return false;
    }
  };

  const handleUpdateDay = async (dayId, updatedData) => {
    try {
      const updatedDay = await api.patch(
        `/trips/${tripId}/days/${dayId}`,
        updatedData,
        "Updating day...",
      );

      setEditedTrip((prev) => ({
        ...prev,
        days: prev.days.map((day) => {
          if (day._id === dayId) {
            return {
              ...updatedDay,
              activities: day.activities || [],
            };
          }
          return day;
        }),
      }));
      return true;
    } catch (error) {
      console.error("Error updating day:", error);
      setServerApiError("Failed to update day");
      return false;
    }
  };

  const handleDeleteDay = async (dayId) => {
    try {
      await api.del(`/trips/${tripId}/days/${dayId}`, null, "Deleting day...");

      const dayToDeleteObj = editedTrip.days.find((day) => day._id === dayId);
      if (!dayToDeleteObj) {
        return false;
      }

      const updatedDays = editedTrip.days.filter((day) => day._id !== dayId);
      const newDuration = updatedDays.length;

      const reorderedDays = updatedDays.map((day) => {
        if (day.dayNumber > dayToDeleteObj.dayNumber) {
          return {
            ...day,
            dayNumber: day.dayNumber - 1,
            title: day.title.replace(/Day \d+/, `Day ${day.dayNumber - 1}`),
          };
        }
        return day;
      });

      setEditedTrip((prev) => ({
        ...prev,
        days: reorderedDays,
        duration: newDuration,
      }));

      updateCities(reorderedDays);

      if (onUpdate) {
        onUpdate({
          ...editedTrip,
          days: reorderedDays,
          duration: newDuration,
        });
      }

      return true;
    } catch (error) {
      console.error("Error deleting day:", error);
      setServerApiError("Failed to delete day");
      return false;
    }
  };

  const handleAddActivity = async (dayId) => {
    try {
      const activityData = {
        title: "New Activity",
        location: {
          name: "Enter location",
          city: "",
          country: "",
          lat: 0,
          lng: 0,
          placeId: "",
        },
      };

      console.log("Creating new activity with data:", activityData);

      const newActivity = await api.post(
        `/trips/${tripId}/days/${dayId}/activities`,
        activityData,
        "Adding new activity...",
      );

      setEditedTrip((prev) => ({
        ...prev,
        days: prev.days.map((day) => {
          if (day._id === dayId) {
            return {
              ...day,
              activities: [...(day.activities || []), newActivity],
            };
          }
          return day;
        }),
      }));

      return true;
    } catch (error) {
      console.error("Error adding activity:", error);
      setServerApiError("Failed to add activity");
      return false;
    }
  };

  const updateCities = (days) => {
    const uniqueCities = getUniqueCitiesFromDays(days);
    setEditedTrip((prev) => ({
      ...prev,
      cities: uniqueCities,
    }));
  };

  const handleUpdateActivity = async (dayId, activityId, updatedData) => {
    try {
      const dataToSend = { ...updatedData };

      if (dataToSend.location) {
        const { lat, lng } = dataToSend.location;
        dataToSend.location = {
          ...dataToSend.location,
          lat: Number(lat) || 0,
          lng: Number(lng) || 0,
          placeId: dataToSend.location.placeId?.toString() || "",
        };
      }

      console.log("Sending activity update data:", dataToSend);

      const updatedActivity = await api.patch(
        `/trips/${tripId}/days/${dayId}/activities/${activityId}`,
        dataToSend,
        "Updating activity...",
      );

      let updatedDays;

      setEditedTrip((prev) => {
        updatedDays = prev.days.map((day) => {
          if (day._id === dayId) {
            return {
              ...day,
              activities: (day.activities || []).map((activity) =>
                activity._id === activityId ? updatedActivity : activity,
              ),
            };
          }
          return day;
        });

        return {
          ...prev,
          days: updatedDays,
        };
      });

      updateCities(updatedDays);

      return true;
    } catch (error) {
      console.error("Error updating activity:", error);
      setServerApiError("Failed to update activity");
      return false;
    }
  };

  const handleDeleteActivity = async (dayId, activityId) => {
    try {
      await api.del(
        `/trips/${tripId}/days/${dayId}/activities/${activityId}`,
        null,
        "Deleting activity...",
      );

      let updatedDays;

      setEditedTrip((prev) => {
        updatedDays = prev.days.map((day) => {
          if (day._id === dayId) {
            const remainingActivities = day.activities.filter(
              (a) => a._id !== activityId,
            );

            const reorderedActivities = remainingActivities.map(
              (activity, index) => ({
                ...activity,
                order: index + 1,
                activityNumber: index + 1,
              }),
            );

            return {
              ...day,
              activities: reorderedActivities,
            };
          }
          return day;
        });

        return {
          ...prev,
          days: updatedDays,
        };
      });

      updateCities(updatedDays);

      return true;
    } catch (error) {
      console.error("Error deleting activity:", error);
      setServerApiError("Failed to delete activity");
      return false;
    }
  };

  const handleSaveReview = async (reviewData) => {
    try {
      await api.patch(`/trips/${tripId}`, reviewData, "Updating review...");

      setEditedTrip((prev) => ({
        ...prev,
        creatorOverview: reviewData.creatorOverview,
        creatorRating: reviewData.creatorRating,
      }));

      return true;
    } catch (error) {
      console.error("Error updating overview:", error);
      setServerApiError("Failed to update review");
      return false;
    }
  };

  const handlePublishTrip = async () => {
    let isValid = true;
    let errorMessage = "";

    if (!editedTrip.title) {
      isValid = false;
      errorMessage = "Trip must have a title";
    }

    if (editedTrip.days.length === 0) {
      isValid = false;
      errorMessage = "Trip must have at least one day";
    }

    if (!editedTrip.coverPhotoUrl) {
      isValid = false;
      errorMessage = "Please add a cover photo before publishing";
    }

    const actualDaysCount = editedTrip.days.length;
    if (editedTrip.duration !== actualDaysCount) {
      console.log(`Duration and days count don't match`);

      await api.patch(
        `/trips/${tripId}`,
        { duration: actualDaysCount },
        "Updating trip duration...",
      );

      setEditedTrip((prev) => ({
        ...prev,
        duration: actualDaysCount,
      }));
    }

    for (const day of editedTrip.days) {
      if (!day.activities || day.activities.length === 0) {
        isValid = false;
        errorMessage = `Day ${day.dayNumber} must have at least one activity`;
        break;
      }

      for (const activity of day.activities) {
        if (!activity.title) {
          isValid = false;
          errorMessage = `Activity in Day ${day.dayNumber} must have a title`;
          break;
        }
        if (!activity.location || !activity.location.name) {
          isValid = false;
          errorMessage = `Activity "${activity.title}" in Day ${day.dayNumber} must have a location`;
          break;
        }
      }
    }

    if (
      !editedTrip.creatorOverview ||
      editedTrip.creatorOverview.trim() === ""
    ) {
      isValid = false;
      errorMessage = "Please add your review before publishing";
    }

    if (!editedTrip.creatorRating || editedTrip.creatorRating < 1) {
      isValid = false;
      errorMessage = "Please rate your trip before publishing";
    }

    if (!isValid) {
      setServerApiError(errorMessage);
      return;
    }

    const success = await onPublish();

    if (success) {
      setEditedTrip((prev) => ({
        ...prev,
        isPublished: true,
      }));
    }

    return success;
  };

  const handleUnpublishTrip = async () => {
    const success = await onUnpublish();

    if (success) {
      setEditedTrip((prev) => ({
        ...prev,
        isPublished: false,
      }));
    }

    return success;
  };

  const handleSaveChanges = async () => {
    try {
      const actualDaysCount = editedTrip.days.length;
      if (editedTrip.duration !== actualDaysCount) {
        console.log(`Duration and days count don't match`);

        setEditedTrip((prev) => ({
          ...prev,
          duration: actualDaysCount,
        }));

        await new Promise((resolve) => setTimeout(resolve, 0));
      }

      const success = await onUpdate({
        ...editedTrip,
        duration: actualDaysCount,
      });

      if (success) {
        setEditedTrip((prev) => ({
          ...prev,
          duration: actualDaysCount,
        }));
      }

      return success;
    } catch (error) {
      console.error("Error saving changes:", error);
      setServerApiError("Failed to save changes");
      return false;
    }
  };

  return (
    <div className="trip-page mt-10">
      <div className="trip-content max-w-5xl mx-auto px-4 py-8">
        <TripHeaderSection
          trip={editedTrip}
          isEditable={true}
          onTitleSave={handleTitleSave}
        />

        <TripActionsSection
          isPublished={editedTrip.isPublished}
          isEditable={true}
          isOwner={isOwner}
          onSave={handleSaveChanges}
          onPublish={handlePublishTrip}
          onUnpublish={handleUnpublishTrip}
          onDelete={() => setShowDeleteModal(true)}
        />

        <TripCoverOrPhotoMapSection
          coverPhotoUrl={editedTrip.coverPhotoUrl}
          days={editedTrip.days}
          isEditable={true}
          onCoverPhotoUpload={handleCoverPhotoUpload}
        />

        <TripDaysSection
          days={editedTrip.days}
          isEditable={true}
          onAddDay={handleAddDay}
          onUpdateDay={handleUpdateDay}
          onDeleteDay={handleDeleteDay}
          onAddActivity={handleAddActivity}
          onUpdateActivity={handleUpdateActivity}
          onDeleteActivity={handleDeleteActivity}
        />

        <TripAuthorReviewSection
          trip={editedTrip}
          isEditable={true}
          onReviewSave={handleSaveReview}
        />

        <section className="trip-actions-bottom mb-8">
          <TripActionsSection
            isPublished={editedTrip.isPublished}
            isEditable={true}
            isOwner={isOwner}
            onSave={handleSaveChanges}
            onPublish={handlePublishTrip}
            onUnpublish={handleUnpublishTrip}
            onDelete={() => setShowDeleteModal(true)}
          />
        </section>
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

export default EditableTripLayout;
