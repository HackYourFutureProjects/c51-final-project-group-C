import { useState, useEffect } from "react";

const CompleteTripPage = () => {
  // For getting the trip data
  // const { tripId } = useParams();

  const [tripData, setTripData] = useState({
    title: "",
    isPublished: false,
    days: [],
    overallRating: 0,
    overallReview: "",
  });

  const [dayIndex, setDayIndex] = useState(null);

  useEffect(() => {
    setTripData({
      title: "My First Solo Trip",
      isPublished: false,
      days: [
        { title: "Arrival & City Tour", activities: [] },
        { title: "Beach Day", activities: [] },
        { title: "Hiking Adventure", activities: [] },
      ],
      overallRating: 4,
      overallReview: "It was a fantastic experience!",
    });
  }, []);

  const addDay = () => {
    const newDay = { title: "", activities: [] };
    setTripData({ ...tripData, days: [...tripData.days, newDay] });
  };

  const toggleDay = (index) => {
    setDayIndex(dayIndex === index ? null : index);
  };

  return (
    <div className="complete-trip-details max-w-5xl mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Trip Title"
          value={tripData.title}
          onChange={(e) => setTripData({ ...tripData, title: e.target.value })}
          className="text-2xl font-semibold w-full max-w-md border-b border-gray-300 focus:outline-none focus:border-accent"
        />
        <button className="ml-4 bg-accent text-white px-4 py-2 rounded">
          {tripData.isPublished ? "Unpublish" : "Publish"}
        </button>
      </div>

      {/* Add photo section */}
      <div className="mb-6">
        <button className="text-accent underline">+ Add cover photo</button>
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
              <span className="font-medium">
                Day {i + 1} : {day.title || "Untitled"}
              </span>
              <button className="text-accent underline">
                {dayIndex === i ? "Collapse" : "Edit"}
              </button>
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
                  {day.activities.length === 0 && <p>No activities yet.</p>}
                  {day.activities.map((activity, j) => (
                    <div key={j} className="flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder="Activity title"
                        value={activity.title}
                        onChange={(e) => {
                          const newDays = [...tripData.days];
                          newDays[i].activities[j].title = e.target.value;
                          setTripData({ ...tripData, days: newDays });
                        }}
                        className="border p-2 rounded flex-grow"
                      />
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
                  ))}
                </div>

                {/* Add Activity */}
                <button
                  className="text-accent underline"
                  onClick={() => {
                    const newDays = [...tripData.days];
                    newDays[i].activities.push({ title: "" });
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
        {/* Simple stars or emojis for now */}
        <div className="flex mb-4">
          {Array.from({ length: 5 }).map((_, idx) => (
            <span
              key={idx}
              className={`text-2xl cursor-pointer ${
                idx < tripData.overallRating
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
              onClick={() =>
                setTripData({ ...tripData, overallRating: idx + 1 })
              }
            >
              ★
            </span>
          ))}
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

      {/* Save/Publish footer */}
      <div className="mt-6 text-right">
        <button className="bg-accent text-white px-4 py-2 rounded">Save</button>
      </div>
    </div>
  );
};

export default CompleteTripPage;
