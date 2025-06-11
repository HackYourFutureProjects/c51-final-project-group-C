import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import Cards from "../../components/Cards";
import useFetch from "../../hooks/useFetch";
import { useError } from "../../context/ErrorContext";

import { useEffect, useState } from "react";
import FilterButton from "../../components/SearchAndFilter/FilterButton";
import SearchInput from "../../components/SearchAndFilter/SearchInput";
import DropDownMenu from "../../components/DropDownMenu";
import NoResultFound from "../../components/SearchAndFilter/NoResultFound";

const SortBy = ["Rating", "Duration", "Clear"];

const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [selectedSort, setSelectedSort] = useState(null);
  const [searchParams] = useSearchParams();
  const duration = searchParams.get("duration");
  const country = searchParams.get("country");
  const [trips, setTrips] = useState([]);
  console.log(trips);
  const api = useFetch();
  const setServerApiError = useError();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const params = new URLSearchParams();
        if (debouncedSearch.trim()) {
          params.append("title", debouncedSearch.trim());
        }
        if (selectedSort && selectedSort !== "Clear") {
          console.log("Selected sort:", selectedSort);
          params.append("sort", selectedSort.toLowerCase());
        }
        if (duration) params.append("duration", duration);
        if (country) params.append("country", country);

        let url = "/trips";
        if ([...params].length > 0) {
          url += "?" + params.toString();
        }

        const data = await api.get(url);
        setTrips(data);
      } catch (err) {
        console.error("Failed to fetch trips: ", err);
        setServerApiError(err.message);
      }
    };

    fetchTrips();
  }, [debouncedSearch, selectedSort, duration, country]);

  return (
    <div className="relative">
      <h1 className="home-message flex justify-center mt-20">Welcome!</h1>
      <div className="search-container m-10 flex justify-center gap-4 flex-wrap p-4">
        <SearchInput search={search} setSearch={setSearch} />
        <FilterButton
          onClick={() => {
            const params = new URLSearchParams(window.location.search);
            navigate(`/filters?${params.toString()}`);
          }}
        />
        <DropDownMenu
          name={"Sort by"}
          items={SortBy}
          onClick={(item) => setSelectedSort(item === "Clear" ? null : item)}
        />
      </div>
      <Cards trips={trips} />
      <Outlet />
      {trips.length === 0 && <NoResultFound />}
    </div>
  );
};

export default Home;
