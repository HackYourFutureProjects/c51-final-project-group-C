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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Country:</label>
        <input
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Duration (days):</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
      </div>
      <button type="submit">Create New Trip Plan</button>
    </form>
  );
};

export default CreateTripPlan;
