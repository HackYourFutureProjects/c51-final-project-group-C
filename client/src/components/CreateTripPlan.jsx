import { useState } from "react";
// import { useNavigate } from "react-router-dom";

const CreateTripPlan = () => {
  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("");
  const [duration, setDuration] = useState("");
  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO: Actual API call

    // Redirect to Trip Details Page with navigate
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          className="w-full border rounded p-2"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Country:</label>
        <input
          value={country}
          className="w-full border rounded p-2"
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Duration (days):</label>
        <input
          type="number"
          value={duration}
          className="w-full border rounded p-2"
          onChange={(e) => setDuration(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90"
        >
          Create New Trip Plan
        </button>
      </div>
    </form>
  );
};

export default CreateTripPlan;
