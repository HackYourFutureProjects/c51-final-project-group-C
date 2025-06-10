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
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [trips, setTrips] = useState([]);
  console.log(trips);
  const api = useFetch();
  const setServerApiError = useError();
  const { startLoading, stopLoading } = useLoading();

  // Debounce effect: update debouncedSearch 2 seconds after user stops typing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);

    // Cleanup if user types before 2 seconds
    return () => clearTimeout(handler);
  }, [search]);

  // Fetch trips when debouncedSearch changes
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        startLoading("Loading Trips...");
        let url = "/trips";
        if (debouncedSearch.trim() !== "") {
          url += `?title=${encodeURIComponent(debouncedSearch.trim())}`;
        }
        const data = await api.get(url);
        setTrips(data);
      } catch (err) {
        console.error("Failed to fetch trips: ", err);
        setServerApiError(err.message);
      } finally {
        stopLoading();
      }
    };

    fetchTrips();
  }, [debouncedSearch]);

  return (
    <div className="relative">
      <>
        <h1 className="home-message flex justify-center mt-20">Welcome!</h1>
        <div className="search-container m-10 flex justify-center gap-4 flex-wrap p-4">
          <SearchInput search={search} setSearch={setSearch} />
          <FilterButton onClick={() => navigate("/filters")} />
          <DropDownMenu onClick={() => {}} name={"Sort by"} items={SortBy} />
        </div>
      </>
      <Cards />
      <Outlet />
    </div>
  );
};

export default Home;
