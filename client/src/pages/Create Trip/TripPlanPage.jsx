import CreateTripPlan from "../../components/CreateTripPlan";

const TripPlanPage = () => {
  return (
    <main className="trip-plan-container p-8">
      <h1 className="trip-plan-header text-2xl font-bold mb-4 text-center">
        New Trip Plan
      </h1>
      <CreateTripPlan />
    </main>
  );
};

export default TripPlanPage;
