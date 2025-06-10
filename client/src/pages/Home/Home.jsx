import { Outlet, useNavigate } from "react-router-dom";
import Cards from "../../components/Cards";
import useFetch from "../../hooks/useFetch";
import { useError } from "../../context/ErrorContext";
import { useLoading } from "../../context/LoadingContext";
import { useEffect, useState } from "react";
import FilterButton from "../../components/SearchAndFilter/FilterButton";
import SearchInput from "../../components/SearchAndFilter/SearchInput";
import DropDownMenu from "../../components/DropDownMenu";

const SortBy = ["Rating", "Duration"];

const Home = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  console.log(trips);
  const api = useFetch();
  const setServerApiError = useError();
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        startLoading("Loading Trips...");
        const data = await api.get("/trips");
        setTrips(data);
      } catch (err) {
        console.error("Failed to fetch trips: ", err);
        setServerApiError(err.message);
      } finally {
        stopLoading();
      }
    };

    fetchTrips();
  }, []);

  return (
    <div className="relative">
      {/* Moved HomeSearch content here */}
      <>
        <h1 className="home-message flex justify-center mt-20">Welcome!</h1>
        <div className="search-container m-10 flex justify-center gap-4 flex-wrap p-4">
          <SearchInput />
          <FilterButton onClick={() => navigate("/filters")} />
          <DropDownMenu onClick={() => {}} name={"Sort by"} items={SortBy} />
        </div>
      </>
      {/* Pass trips data to Cards */}
      <Cards />
      <Outlet />
    </div>
  );
};

export default Home;
