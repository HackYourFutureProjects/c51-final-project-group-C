import { useState, useEffect } from "react";
import RatingStars from "../../components/RatingStars";

const CompleteTripPage = () => {
  // For getting the trip data
  // const { tripId } = useParams();

  const [tripData, setTripData] = useState({
    title: "",
    isPublished: false,
    coverPhoto: null,
    duration: 0,
    countries: [],
    days: [],
    overallRating: 0,
    overallReview: "",
  });

  const [dayIndex, setDayIndex] = useState(null);

  useEffect(() => {
    setTripData({
      title: "3 Days in Paris: Art, Culture & Cuisine",
      isPublished: false,
      duration: 3,
      countries: ["France"],
      days: [
        {
          title: "Arrival & City Tour",
          activities: [
            {
              title: "Check-in at Hotel Le Meurice",
              location: "228 Rue de Rivoli, Paris",
              notes:
                "Luxury hotel near the Louvre, perfect for a central stay.",
            },
            {
              title: "Visit Eiffel Tower",
              location: "Champ de Mars, Paris",
              notes:
                "Explore the most famous landmark and enjoy the panoramic view from the top.",
            },
            {
              title: "Seine River Cruise",
              location: "Port de la Bourdonnais",
              notes:
                "Evening boat ride to see Paris illuminated along the riverbanks.",
            },
          ],
        },
        {
          title: "Art & History Exploration",
          activities: [
            {
              title: "Louvre Museum Tour",
              location: "Rue de Rivoli, Paris",
              notes:
                "Home of the Mona Lisa and thousands of historic masterpieces.",
            },
            {
              title: "Lunch at Café de Flore",
              location: "Boulevard Saint-Germain, Paris",
              notes:
                "One of Paris' oldest coffeehouses, frequented by artists and writers.",
            },
            {
              title: "Notre-Dame Cathedral Visit",
              location: "Île de la Cité, Paris",
              notes:
                "Explore this Gothic architectural wonder and its rich history.",
            },
          ],
        },
        {
          title: "Montmartre & Culinary Delights",
          activities: [
            {
              title: "Morning Walk in Montmartre",
              location: "Montmartre Hill",
              notes:
                "Stroll through cobblestone streets and visit the famous Sacré-Cœur.",
            },
            {
              title: "Cooking Class: French Pastries",
              location: "Le Foodist, Paris",
              notes:
                "Learn how to bake authentic croissants and éclairs with a French chef.",
            },
            {
              title: "Dinner at Le Jules Verne",
              location: "Eiffel Tower, Paris",
              notes:
                "Fine dining experience with a view, located inside the Eiffel Tower.",
            },
          ],
        },
      ],
      overallRating: 4,
      overallReview:
        "Every moment in Paris felt magical. The food, the art, the atmosphere — unforgettable!",
    });
  }, []);

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

  return (
    <div className="complete-trip-details max-w-5xl mx-auto p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
        {/* Trip Title */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Trip Title"
            value={tripData.title}
            onChange={(e) =>
              setTripData({ ...tripData, title: e.target.value })
            }
            className="text-2xl font-semibold w-full border-b border-gray-300 focus:outline-none focus:border-accent"
          />
        </div>
        <div className="flex flex-wrap gap-6 text-base text-gray-700">
          {/* Duration Input */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-500 whitespace-nowrap">
              Duration:
            </label>
            <input
              type="number"
              placeholder="Duration (in days)"
              value={tripData.duration}
              min={1}
              onChange={(e) => {
                const newDuration = parseInt(e.target.value);
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
              className="w-10 border-b border-gray-300 focus:outline-none focus:border-accent"
            />
            <span className="text-sm text-gray-500">days</span>
          </div>
          {/* Country Select */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 whitespace-nowrap">
              Country:
            </span>
            <input
              type="text"
              placeholder="Countries (comma-separated)"
              value={(tripData.countries || []).join(", ")}
              onChange={(e) =>
                setTripData({
                  ...tripData,
                  countries: e.target.value.split(",").map((c) => c.trim()),
                })
              }
              className="text-base border-b border-gray-300 focus:outline-none focus:border-accent w-64"
            />
          </div>
        </div>
      </div>

      {/* Cover Photo Upload + Preview */}
      <div className="mb-6">
        {tripData.coverPhoto ? (
          <div className="mb-4">
            <div className="relative w-full aspect-[16/9] rounded overflow-hidden">
              <img
                src={URL.createObjectURL(tripData.coverPhoto)}
                alt="Cover photo"
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            </div>
            <button
              onClick={() => setTripData({ ...tripData, coverPhoto: null })}
              className="mt-2 text-sm text-red-500 underline"
            >
              Remove cover photo
            </button>
          </div>
        ) : (
          <label
            htmlFor="cover-photo-input"
            className="block w-full h-64 cursor-pointer border-2 border-dashed border-accent flex items-center justify-center text-accent rounded-lg hover:bg-orange-50 transition mb-4"
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
      <div className="space-y-4">
        {tripData.days.map((day, i) => (
          <div key={i} className="border rounded shadow-sm">
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
                  className="text-accent underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDay(i);
                  }}
                >
                  {dayIndex === i ? "Collapse" : "Edit"}
                </button>
                <button
                  className="text-red-500 text-sm underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    const updatedDays = tripData.days.filter(
                      (_, index) => index !== i,
                    );
                    setTripData({
                      ...tripData,
                      days: updatedDays,
                      duration: updatedDays.length,
                    });
                  }}
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Accordion Content */}
            {dayIndex === i && (
              <div className="p-4 border-t bg-gray-50 space-y-4">
                {/* Day Title Edit */}
                <input
                  type="text"
                  placeholder="Day Title"
                  value={day.title}
                  onChange={(e) => {
                    const newDays = [...tripData.days];
                    newDays[i].title = e.target.value;
                    setTripData({ ...tripData, days: newDays });
                  }}
                  className="border p-2 rounded w-full"
                />
                {/* Activities List */}
                <div className="space-y-2">
                  {day.activities.length === 0 && (
                    <p className="text-gray-500">No activities yet.</p>
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
                          <label className="text-sm font-medium block mb-1">
                            Title
                          </label>
                          <input
                            type="text"
                            placeholder="Activity title"
                            value={activity.title}
                            onChange={(e) => {
                              const newDays = [...tripData.days];
                              newDays[i].activities[j].title = e.target.value;
                              setTripData({ ...tripData, days: newDays });
                            }}
                            className="border p-2 rounded w-full"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium block mb-1">
                            Location
                          </label>
                          <input
                            type="text"
                            placeholder="Location"
                            value={activity.location || ""}
                            onChange={(e) => {
                              const newDays = [...tripData.days];
                              newDays[i].activities[j].location =
                                e.target.value;
                              setTripData({ ...tripData, days: newDays });
                            }}
                            className="border p-2 rounded w-full"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium block mb-1">
                            Notes
                          </label>
                          <textarea
                            placeholder="Activity Notes"
                            value={activity.notes || ""}
                            onChange={(e) => {
                              const newDays = [...tripData.days];
                              newDays[i].activities[j].notes = e.target.value;
                              setTripData({ ...tripData, days: newDays });
                            }}
                            className="border p-2 rounded w-full"
                            rows={2}
                          ></textarea>
                        </div>
                        <div className="text-right">
                          <button
                            className="text-red-500"
                            onClick={() => {
                              const newDays = [...tripData.days];
                              newDays[i].activities.splice(j, 1);
                              setTripData({ ...tripData, days: newDays });
                            }}
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
                  className="text-accent underline"
                  onClick={() => {
                    const newDays = [...tripData.days];
                    newDays[i].activities.push({
                      title: "",
                      location: "",
                      notes: "",
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
            className="mt-2 text-sm text-accent underline"
            onClick={addDay}
          >
            + Add new day
          </button>
        </div>
      </div>

      {/* Overall experience section */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-2">
          Rate your overall trip experience
        </h3>
        {/* Simple stars and overview section */}
        <div className="mb-8">
          <RatingStars
            rating={tripData.overallRating}
            onRate={(newRating) =>
              setTripData({ ...tripData, overallRating: newRating })
            }
          />
        </div>
        <textarea
          rows={4}
          placeholder="Write your overall review here..."
          value={tripData.overallReview}
          onChange={(e) =>
            setTripData({ ...tripData, overallReview: e.target.value })
          }
          className="w-full border border-gray-300 rounded p-2"
        ></textarea>
      </div>

      {/* Save/Publish buttons */}
      <div className="mt-6 text-right space-x-6">
        <button className="bg-white text-accent border border-orange-500 px-4 py-2 rounded shadow-sm hover:bg-orange-50 transition">
          Save
        </button>
        <button className="bg-accent text-white px-4 py-2 rounded shadow-sm hover:bg-orange-600 transition">
          Publish
        </button>
      </div>
    </div>
  );
};

export default CompleteTripPage;
