import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useFetch from "../hooks/useFetch";
import { useError } from "../context/ErrorContext";

const RequireTripOwnershipRoute = ({ children }) => {
  const { tripId } = useParams();
  const { user } = useAuth();
  const api = useFetch();
  const { setServerApiError } = useError();

  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const checkTripOwnership = async () => {
      try {
        const tripData = await api.get(
          `/trips/${tripId}`,
          "Checking trip ownership...",
        );
        const userIsOwner =
          user && tripData.user && user.id === tripData.user.id;
        setIsOwner(userIsOwner);
        setLoading(false);
      } catch (error) {
        console.error("Error checking trip ownership:", error);
        setServerApiError("Failed to verify trip ownership");
        setLoading(false);
      }
    };

    if (tripId && user) {
      checkTripOwnership();
    } else {
      setLoading(false);
    }
  }, [tripId, user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Checking trip ownership...
      </div>
    );
  }

  if (!isOwner) {
    return <Navigate to={`/trips/${tripId}`} replace />;
  }

  return children;
};

export default RequireTripOwnershipRoute;
