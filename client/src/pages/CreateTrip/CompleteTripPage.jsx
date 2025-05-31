// import { useParams } from "react-router-dom";
import { useState } from "react";

const CompleteTripPage = () => {
  // // For getting the trip data
  // const { tripId } = useParams();

  const [tripData, setTripData] = useState({
    title: "",
    isPublished: false,
    days: [],
    overallRating: 0,
    overallReview: "",
  });

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
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="border p-4 rounded shadow-sm flex justify-between items-center"
          >
            <span className="font-medium">Day {i + 1}</span>
            <button className="text-accent">Edit</button>
          </div>
        ))}

        {/* Add new day */}
        <div>
          <button className="mt-2 text-sm text-accent underline">
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
