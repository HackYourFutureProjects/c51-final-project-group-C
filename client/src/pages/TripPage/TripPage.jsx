import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useError } from "../../context/ErrorContext";
import { useAuth } from "../../context/AuthContext";
import PublishedTripLayout from "./modes/PublishedTripLayout";
import EditableTripLayout from "./modes/EditableTripLayout";

const TripPage = () => {
  const { tripId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const isEditMode = location.pathname.endsWith("/edit");
  const api = useFetch();
  const { user, isAuthenticated, openRequireAuth } = useAuth();
  const { setServerApiError } = useError();

  const [trip, setTrip] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  /* eslint-disable no-unused-vars */
  const [isBookmarked, setIsBookmarked] = useState(false); // not implemented yet

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const tripData = await api.get(`/trips/${tripId}`, "Loading trip...");
        setTrip(tripData);
        console.log("Fetched trip:", tripData);

        const userIsOwner =
          user && tripData.user && user.id === tripData.user.id;
        setIsOwner(userIsOwner);

        if (!tripData.isPublished && !userIsOwner) {
          navigate("/");
          return;
        }

        if (!tripData.isPublished && userIsOwner && !isEditMode) {
          navigate(`/trips/${tripId}/edit`);
        }

        // Fetch the users bookmarks to compare with current trip
        if (user) {
          const bookmarksData = await api.get("/users/me/bookmarks");
          const bookmarkedTrips = bookmarksData.trips.map((t) => t._id);
          setIsBookmarked(bookmarkedTrips.includes(tripId));
        }
      } catch (error) {
        console.error("Error fetching trip:", error);
        setServerApiError("Failed to load trip data");
      }
    };

    if (tripId) {
      fetchTrip();
    }
  }, [tripId, user, isEditMode, navigate, setServerApiError]);

  const handleTripUpdate = async (updatedData) => {
    try {
      let countriesData = updatedData.countries;
      if (
        countriesData &&
        Array.isArray(countriesData) &&
        countriesData.length > 0 &&
        typeof countriesData[0] === "object"
      ) {
        countriesData = countriesData.map((country) => country._id);
      }

      const allowedFields = {
        title: updatedData.title,
        countries: countriesData,
        cities: updatedData.cities,
        creatorOverview: updatedData.creatorOverview,
        creatorRating: updatedData.creatorRating,
        coverPhotoUrl: updatedData.coverPhotoUrl,
      };

      const cleanedData = {};
      for (const key in allowedFields) {
        if (allowedFields[key] !== undefined) {
          cleanedData[key] = allowedFields[key];
        }
      }

      console.log(
        "Update trip data (to updateTrip controller):",
        JSON.stringify(cleanedData, null, 2),
      );

      const updatedTrip = await api.patch(
        `/trips/${tripId}`,
        cleanedData,
        "Updating trip...",
      );

      setTrip((prevTrip) => ({
        ...updatedTrip,
        user: prevTrip.user,
      }));

      return true;
    } catch (error) {
      console.error("Error updating trip:", error);
      setServerApiError("Failed to update trip");
      return false;
    }
  };

  const handlePublishTrip = async () => {
    try {
      await api.put(`/trips/${tripId}/publish`, {}, "Publishing trip...");
      setTrip((prevTrip) => ({
        ...prevTrip,
        isPublished: true,
        datePublished: new Date().toISOString(),
      }));
      navigate(`/trips/${tripId}`);
      return true;
    } catch (error) {
      console.error("Error publishing trip:", error);
      setServerApiError("Failed to publish trip");
      return false;
    }
  };

  const handleUnpublishTrip = async () => {
    try {
      await api.put(`/trips/${tripId}/unpublish`, {}, "Unpublishing trip...");
      setTrip((prevTrip) => ({
        ...prevTrip,
        isPublished: false,
      }));
      navigate(`/trips/${tripId}/edit`);
      return true;
    } catch (error) {
      console.error("Error unpublishing trip:", error);
      setServerApiError("Failed to unpublish trip");
      return false;
    }
  };

  const handleCopyTrip = async () => {
    // 👇 If user is not authenticated, we open the require auth modal

    if (!isAuthenticated) {
      openRequireAuth();
      return false;
    }

    try {
      const response = await api.post(
        `/trips/${tripId}/copy`,
        {},
        "Copying trip...",
      );

      const copiedTripId = response.trip?._id;

      if (!copiedTripId) {
        console.error("Invalid response format from copy API:", response);
        setServerApiError("Failed to copy trip: Invalid response format");
        return false;
      }

      navigate(`/trips/${copiedTripId}/edit`);
      return true;
    } catch (error) {
      console.error("Error copying trip:", error);
      setServerApiError("Failed to copy trip");
      return false;
    }
  };

  const handleDeleteTrip = async () => {
    try {
      await api.del(`/trips/${tripId}`, null, "Deleting trip...");
      navigate("/");
      return true;
    } catch (error) {
      console.error("Error deleting trip:", error);
      setServerApiError("Failed to delete trip");
      return false;
    }
  };

  const handleBookmarkToggle = async () => {
    // 👇 If user is not authenticated, we open the require auth modal

    if (!isAuthenticated) {
      openRequireAuth();
      return;
    }

    try {
      await api.post(`/trips/${tripId}/bookmark`);
      setIsBookmarked((prev) => !prev);

      // Update the info section
      setTrip((prevTrip) => ({
        ...prevTrip,
        timesBookmarked: isBookmarked
          ? Math.max((prevTrip.timesBookmarked || 1) - 1, 0)
          : (prevTrip.timesBookmarked || 0) + 1,
      }));
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      setServerApiError("Failed to toggle bookmark");
    }
  };

  if (!trip) {
    return <div className="text-center py-10">Loading trip...</div>;
  }

  return (
    <>
      {isEditMode ? (
        <EditableTripLayout
          trip={trip}
          isOwner={isOwner}
          onUpdate={handleTripUpdate}
          onPublish={handlePublishTrip}
          onUnpublish={handleUnpublishTrip}
          onDelete={handleDeleteTrip}
        />
      ) : (
        <PublishedTripLayout
          trip={trip}
          isOwner={isOwner}
          isBookmarked={isBookmarked}
          onCopy={handleCopyTrip}
          onEdit={() => navigate(`/trips/${tripId}/edit`)}
          onUnpublish={handleUnpublishTrip}
          onDelete={handleDeleteTrip}
          onBookmarkToggle={handleBookmarkToggle}
        />
      )}
    </>
  );
};

export default TripPage;
