import { useState, useEffect } from "react";
import RatingStars from "../../components/RatingStars";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import LocationSearch from "../../components/LocationSearch";
import { useError } from "../../context/ErrorContext";
import { useLoading } from "../../context/LoadingContext";

const CompleteTripPage = () => {
  // For getting the trip data
  const { tripId } = useParams();
  const api = useFetch();
  const { setServerApiError, clearAllServerErrors } = useError();
  const { isLoading } = useLoading();

  const [tripData, setTripData] = useState({
    title: "",
    published: false,
    coverPhoto: null,
    duration: 0,
    countries: [],
    days: [],
    creatorRating: 0,
    creatorOverview: "",
  });

  const [dayIndex, setDayIndex] = useState(null);

  useEffect(() => {
    if (!tripId) return;
    clearAllServerErrors();

    const fetchTrip = async () => {
      try {
        const data = await api.get(`/trips/${tripId}`);

        // Normalize locations so each activity.location has a display_name
        const normalizedDays = (data.days || []).map((day) => ({
          ...day,
          activities: (day.activities || []).map((activity) => ({
            ...activity,
            location: activity.location
              ? {
                  ...activity.location,
                  display_name:
                    activity.location.display_name ||
                    activity.location.address ||
                    "",
                }
              : null,
          })),
        }));

        setTripData({
          _id: data._id,
          title: data.title || "",
          published: data.published || false,
          coverPhoto: null,
          duration: data.duration || 1,
          countries: data.countries || [],
          days:
            normalizedDays.length > 0
              ? normalizedDays
              : Array.from(
                  { length: data.duration || 1 },
                  (_, idx) => data.days?.[idx] || { title: "", activities: [] },
                ),
          creatorRating: data.creatorRating || 0,
          creatorOverview: data.creatorOverview || "",
        });
      } catch (err) {
        setServerApiError(err.message || "Failed to load trip data.");
      }
    };

    fetchTrip();
  }, [tripId]);

  const addDay = () => {
    const newDay = { title: "", activities: [] };
    setTripData({
      ...tripData,
      days: [...tripData.days, newDay],
      duration: tripData.days.length + 1,
    });
  };

  const toggleDay = (index) => {
    setDayIndex(dayIndex === index ? null : index);
  };

  const deleteDay = async (dayId) => {
    try {
      if (dayId) {
        await api.del(`/trips/${tripId}/days/${dayId}`);
      }

      // Remove the deleted day and reindex
      const remainingDays = tripData.days
        .filter((day) => day._id !== dayId)
        .sort((a, b) => a.dayNumber - b.dayNumber);

      const updatedDays = await Promise.all(
        remainingDays.map(async (day, idx) => {
          const newDayNumber = idx + 1;
          if (day.dayNumber !== newDayNumber) {
            await api.put(`/trips/${tripData._id}/days/${day._id}`, {
              dayNumber: newDayNumber,
            });
          }
          return { ...day, dayNumber: newDayNumber };
        }),
      );

      setTripData((prev) => ({
        ...prev,
        days: updatedDays,
        duration: updatedDays.length,
      }));
    } catch (err) {
      setServerApiError(err.message || "Failed to delete day.");
    }
  };

  const updateActivityField = (dayInd, activityInd, field, value) => {
    const newDays = [...tripData.days];
    const activity = newDays[dayInd].activities[activityInd];

    if (field === "notes") {
      if (!activity.notes) activity.notes = {};
      activity.notes.text = value;
    } else {
      activity[field] = value;
    }
    setTripData({ ...tripData, days: newDays });
  };

  const deleteActivity = async (dayId, activityId) => {
    try {
      await api.del(`/trips/${tripId}/days/${dayId}/activities/${activityId}`);

      const updatedDays = tripData.days.map((day) => {
        if (day._id !== dayId) return day;
        return {
          ...day,
          activities: day.activities.filter((act) => act._id !== activityId),
        };
      });

      setTripData((prev) => ({
        ...prev,
        days: updatedDays,
      }));
    } catch (err) {
      setServerApiError(err.message || "Failed to delete activity.");
    }
  };

  const saveTrip = async () => {
    try {
      let tripId = tripData._id;

      if (!tripId) {
        // Create trip if no ID
        const createdTrip = await api.post(
          "/trips/create-trip",
          {
            title: tripData.title,
            duration: tripData.duration,
            countries: tripData.countries,
          },
          "Creating trip...",
        );
        tripId = createdTrip._id;
        // Update state with new tripId
        setTripData((prev) => ({ ...prev, _id: tripId }));
      }

      // Update overall trip (e.g. ratings, review)
      await api.put(
        `/trips/${tripId}`,
        {
          title: tripData.title,
          duration: tripData.duration,
          countries: tripData.countries.map((c) => c._id),
          creatorOverview: tripData.creatorOverview,
          creatorRating: tripData.creatorRating,
        },
        "Updating trip...",
      );

      // Save days
      const updatedDays = await Promise.all(
        tripData.days.map(async (day, idx) => {
          let dayId = day._id;
          if (!dayId) {
            const createdDay = await api.post(
              `/trips/${tripId}/days/create-day`,
              {
                title: day.title,
                dayNumber: idx + 1, // Day index + 1 for dayNumber
              },
              "Creating day...",
            );
            dayId = createdDay._id;
          } else {
            // UPDATE existing day
            await api.put(
              `/trips/${tripId}/days/${dayId}`,
              {
                title: day.title,
                dayNumber: idx + 1,
              },
              "Updating day...",
            );
          }
          // Save activities for this day
          const updatedActivities = await Promise.all(
            day.activities.map(async (activity) => {
              let activityId = activity._id;
              if (!activityId) {
                const createdActivity = await api.post(
                  `/trips/${tripId}/days/${dayId}/activities/create-activity`,
                  {
                    name: activity.name || "",
                    notes: activity.notes?.text
                      ? {
                          noteNumber: 0,
                          text: activity.notes.text,
                        }
                      : undefined,
                    price: Number(activity.price),
                  },
                  "Creating activity...",
                );
                activityId = createdActivity._id;
              } else {
                // UPDATE existing activity
                await api.put(
                  `/trips/${tripId}/days/${dayId}/activities/${activityId}`,
                  {
                    name: activity.name || "",
                    price: Number(activity.price),
                    notes: activity.notes?.text
                      ? {
                          noteNumber: 0,
                          text: activity.notes.text,
                        }
                      : undefined,
                  },
                  "Updating activity...",
                );
              }

              // Save location if needed
              if (activity.location && !activity.location._id) {
                const createdLocation = await api.post(
                  `/trips/${tripId}/days/${dayId}/activities/${activityId}/locations/create-location`,
                  {
                    coordinates: {
                      lat: Number(activity.location.lat),
                      lng: Number(activity.location.lng),
                    },
                    address:
                      activity.location.display_name ||
                      activity.location.address,
                  },
                  "Creating location...",
                );
                activity.location._id = createdLocation._id;
              } else {
                await api.put(
                  `/trips/${tripId}/days/${dayId}/activities/${activityId}/locations/${activity.location._id}`,
                  {
                    coordinates: {
                      lat: Number(activity.location.lat),
                      lng: Number(activity.location.lng),
                    },
                    address:
                      activity.location.display_name ||
                      activity.location.address,
                  },
                  "Updating location...",
                );
              }

              return {
                ...activity,
                _id: activityId,
                location: activity.location,
              };
            }),
          );

          return {
            ...day,
            _id: dayId,
            activities: updatedActivities,
          };
        }),
      );
      // Update trip data in state
      setTripData((prev) => ({
        ...prev,
        _id: tripId,
        days: updatedDays,
      }));

      return tripId;
    } catch (err) {
      setServerApiError(err.message || "Failed to save trip data.");
    }
  };

  const publishTrip = async () => {
    if (!tripData._id) {
      // If no trip ID, first save the trip so it exists
      const savedId = await saveTrip();
      if (!savedId) return; // stop if save failed
    }

    try {
      await api.put(
        `/trips/publish/${tripData._id}`,
        { published: true },
        "Publishing trip...",
      );

      setTripData((prev) => ({
        ...prev,
        published: !prev.published,
      }));
      // Redirect or other UI feedback here
    } catch (err) {
      setServerApiError(err.message || "Failed to publish trip.");
    }
  };

  if (isLoading) return <p>Loading trip data...</p>;

  return (
    <div className="complete-trip-details max-w-5xl mx-auto p-4">
      {/* Header */}
      <div className="complete-trip-header flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
        {/* Trip Title */}
        <div className="trip-title-container flex-1">
          <input
            type="text"
            placeholder="Trip Title"
            value={tripData.title}
            onChange={(e) =>
              setTripData({ ...tripData, title: e.target.value })
            }
            className="trip-title text-2xl font-semibold w-full border-b border-gray-300 focus:outline-none focus:border-accent"
          />
        </div>
        <div className="flex flex-wrap gap-6 text-base text-gray-700">
          {/* Duration Input */}
          <div className="duration-container flex items-center gap-2">
            <label className="duration-label text-sm text-gray-500 whitespace-nowrap">
              Duration:
            </label>
            <input
              type="number"
              placeholder="Duration (in days)"
              value={tripData.duration}
              min={1}
              onChange={(e) => {
                const newDuration = parseInt(e.target.value) || 1;
                const updatedDays = Array.from(
                  { length: newDuration },
                  (_, idx) =>
                    tripData.days[idx] || { title: "", activities: [] },
                );
                setTripData({
                  ...tripData,
                  duration: newDuration,
                  days: updatedDays,
                });
              }}
              className="trip-duration w-10 border-b border-gray-300 focus:outline-none focus:border-accent"
            />
            <span className="duration-span text-sm text-gray-500">days</span>
          </div>
          {/* Country Select */}
          <div className="countries-container flex items-center gap-2">
            <label className="countries-label text-sm text-gray-500 whitespace-nowrap">
              Country:
            </label>
            <input
              type="text"
              placeholder="Countries (comma-separated)"
              value={(tripData.countries || []).map((c) => c.name).join(", ")}
              onChange={(e) =>
                setTripData({
                  ...tripData,
                  countries: e.target.value
                    .split(",")
                    .map((c) => ({ name: c.trim(), code: "" })),
                })
              }
              className="trip-countries text-base border-b border-gray-300 focus:outline-none focus:border-accent w-64"
            />
          </div>
        </div>
      </div>

      {/* Cover Photo Upload + Preview */}
      <div className="cover-photo-container mb-6">
        {tripData.coverPhoto ? (
          <div className="mb-4">
            <div className="image-container relative w-full aspect-[16/9] rounded overflow-hidden">
              <img
                src={URL.createObjectURL(tripData.coverPhoto)}
                alt="Cover photo"
                className="cover-photo absolute top-0 left-0 w-full h-full object-cover"
              />
            </div>
            <button
              onClick={() => setTripData({ ...tripData, coverPhoto: null })}
              className="remove-photo-button mt-2 text-sm text-red-500 underline"
            >
              Remove cover photo
            </button>
          </div>
        ) : (
          <label
            htmlFor="cover-photo-input"
            className="cover-photo-label block w-full h-64 cursor-pointer border-2 border-dashed border-accent flex items-center justify-center text-accent rounded-lg hover:bg-orange-50 transition mb-4"
          >
            + Add cover photo
          </label>
        )}
        <input
          id="cover-photo-input"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setTripData({ ...tripData, coverPhoto: file });
            }
          }}
          className="hidden"
        />
      </div>

      {/* Day Plan sections */}
      <div className="days-container space-y-4">
        {tripData.days.map((day, i) => (
          <div key={i} className="trip-days-container border rounded shadow-sm">
            {/* Accordion Header */}
            <div
              className="flex justify-between items-center p-4 cursor-pointer"
              onClick={() => toggleDay(i)}
            >
              <div className="flex flex-col">
                <div className="font-medium">
                  Day {i + 1} : {day.title || "Untitled"}
                </div>
                {day.activities?.length > 0 && (
                  <div className="text-sm text-gray-500 mt-1">
                    {day.activities.length}{" "}
                    {day.activities.length > 1 ? "activities" : "activity"}{" "}
                    added
                  </div>
                )}
              </div>
              <div className="flex gap-x-4 items-center">
                <button
                  className="edit-button text-accent underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDay(i);
                  }}
                >
                  {dayIndex === i ? "Collapse" : "Edit"}
                </button>
                <button
                  className="delete-day-button text-red-500 text-sm underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteDay(day._id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Accordion Content */}
            {dayIndex === i && (
              <div className="accordion-container p-4 border-t bg-gray-50 space-y-4">
                {/* Day Title Edit */}
                <input
                  type="text"
                  placeholder="Day Title"
                  value={day.title || ""}
                  onChange={(e) => {
                    const newDays = [...tripData.days];
                    newDays[i].title = e.target.value;
                    setTripData({ ...tripData, days: newDays });
                  }}
                  className="day-title border p-2 rounded w-full"
                />
                {/* Activities List */}
                <div className="activities-container space-y-2">
                  {day.activities.length === 0 && (
                    <p className="activities-text text-gray-500">
                      No activities yet.
                    </p>
                  )}
                  {day.activities.map((activity, j) => (
                    <div
                      key={j}
                      className="border-l-4 border-accent pl-4 relative"
                    >
                      <div className="absolute -left-3 top-4 w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center text-sm">
                        {j + 1}
                      </div>
                      <div className="md:col-span-4 space-y-3">
                        <div>
                          <label className="activity-title-label text-sm font-medium block mb-1">
                            Title
                          </label>
                          <input
                            type="text"
                            placeholder="Activity title"
                            value={activity.name || ""}
                            onChange={(e) =>
                              updateActivityField(i, j, "name", e.target.value)
                            }
                            className="activity-title border p-2 rounded w-full"
                          />
                        </div>
                        <div>
                          <label className="activity-location-label text-sm font-medium block mb-1">
                            Location
                          </label>
                          <LocationSearch
                            value={activity.location}
                            onChange={(locationObj) =>
                              updateActivityField(i, j, "location", locationObj)
                            }
                          />
                        </div>
                        <div>
                          <label className="activity-price-label text-sm font-medium block mb-1">
                            Price
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. 20$"
                            value={activity.price || ""}
                            onChange={(e) =>
                              updateActivityField(i, j, "price", e.target.value)
                            }
                            className="activity-price border p-2 rounded w-full"
                          />
                        </div>
                        <div>
                          <label className="activity-notes-label text-sm font-medium block mb-1">
                            Notes
                          </label>
                          <textarea
                            placeholder="Activity Notes"
                            value={activity.notes?.text || ""}
                            onChange={(e) =>
                              updateActivityField(i, j, "notes", e.target.value)
                            }
                            className="activity-notes border p-2 rounded w-full"
                            rows={2}
                          ></textarea>
                        </div>
                        {/* Photo Upload & Thumbnails */}
                        <div>
                          <label className="block mb-1 text-sm font-medium">
                            Photos (max 3)
                          </label>
                          <label
                            htmlFor={`activity-photo-${i}-${j}`}
                            className="inline-block cursor-pointer bg-accent text-white px-4 py-1.5 text-sm rounded hover:bg-orange-600 transition"
                          >
                            + Add Photo
                          </label>

                          <input
                            id={`activity-photo-${i}-${j}`}
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => {
                              const files = Array.from(e.target.files);
                              const currentPhotos = activity.photos || [];
                              const totalAllowed = 3;

                              const photosToAdd = files.slice(
                                0,
                                totalAllowed - currentPhotos.length,
                              );

                              updateActivityField(i, j, "photos", [
                                ...currentPhotos,
                                ...photosToAdd,
                              ]);

                              e.target.value = null; // allow same file to be added again
                            }}
                            className="sr-only"
                          />
                          {/* Photo thumbnails */}
                          <div className="mt-2 flex gap-2">
                            {(activity.photos || []).map((photo, idx) => (
                              <div
                                key={idx}
                                className="relative w-28 h-28 rounded overflow-hidden border border-gray-300"
                              >
                                <img
                                  src={URL.createObjectURL(photo)}
                                  alt={`activity photo ${idx + 1}`}
                                  className="w-full h-full object-cover"
                                />
                                <button
                                  onClick={() => {
                                    // Remove this photo
                                    const newPhotos = [...activity.photos];
                                    newPhotos.splice(idx, 1);
                                    updateActivityField(
                                      i,
                                      j,
                                      "photos",
                                      newPhotos,
                                    );
                                  }}
                                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-800"
                                  type="button"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <button
                            className="activity-delete-button text-red-500"
                            onClick={() =>
                              deleteActivity(day._id, activity._id)
                            }
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Activity */}
                <button
                  className="add-activity-button text-accent underline"
                  onClick={() => {
                    const newDays = [...tripData.days];
                    newDays[i].activities.push({
                      title: "",
                      location: {
                        lat: null,
                        lng: null,
                        address: "",
                        _id: null,
                      },
                      price: "",
                      notes: { text: "" },
                      photos: [],
                    });
                    setTripData({ ...tripData, days: newDays });
                  }}
                >
                  + Add Activity
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Add new day */}
        <div>
          <button
            className="add-day-button mt-2 text-sm text-accent underline"
            onClick={addDay}
          >
            + Add new day
          </button>
        </div>
      </div>

      {/* Overall experience section */}
      <div className="experience-container mt-10">
        <h3 className="experience-subheader text-lg font-semibold mb-2">
          Rate your overall trip experience
        </h3>
        {/* Simple stars and overview section */}
        <div className="ratings-container mb-8">
          <RatingStars
            rating={tripData.creatorRating}
            onRate={(newRating) =>
              setTripData({ ...tripData, creatorRating: newRating })
            }
          />
        </div>
        <textarea
          rows={4}
          placeholder="Write your overall review here..."
          value={tripData.creatorOverview || ""}
          onChange={(e) =>
            setTripData({ ...tripData, creatorOverview: e.target.value })
          }
          className="overall-review w-full border border-gray-300 rounded p-2"
        ></textarea>
      </div>

      {/* Save/Publish buttons */}
      <div className="footer-buttons mt-6 text-right space-x-6">
        <button
          className="save-button bg-white text-accent border border-orange-500 px-4 py-2 rounded shadow-sm hover:bg-orange-50 transition"
          onClick={saveTrip}
        >
          Save
        </button>
        <button
          disabled={tripData.published}
          className={`publish-button bg-accent text-white px-4 py-2 rounded shadow-sm hover:bg-orange-600 transition ${tripData.published ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={publishTrip}
        >
          Publish
        </button>
      </div>
    </div>
  );
};

export default CompleteTripPage;
