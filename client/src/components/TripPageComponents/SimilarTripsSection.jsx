/* eslint-disable no-unused-vars */
import { LuCompass } from "react-icons/lu";
import TripCard from "../TripCard";
import Grid from "../Grid";
import { allTrips } from "../../assets/dummyData/mockTripData";

const SimilarTripsSection = () => {
  // Mock data for similar trips
  const mockSimilarTrips = allTrips.slice(0, 4);

  return (
    <section className="similar-trips-section mt-16">
      <h2 className="similar-trips-section-title text-2xl font-semibold mb-8">
        Similar Trips
      </h2>
      <Grid columns={4}>
        {mockSimilarTrips.map((similarTrip) => (
          <TripCard key={similarTrip._id} trip={similarTrip} />
        ))}
      </Grid>
    </section>
  );
};

export default SimilarTripsSection;
