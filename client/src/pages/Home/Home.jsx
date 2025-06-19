import { Link, Outlet, useNavigate, useSearchParams } from "react-router-dom";

import useFetch from "../../hooks/useFetch";
import { useError } from "../../context/ErrorContext";

import { useEffect, useState } from "react";
import FilterButton from "../../components/SearchAndFilter/FilterButton";
import SearchInput from "../../components/SearchAndFilter/SearchInput";
import DropDownMenu from "../../components/DropDownMenu";
import NoResultFound from "../../components/SearchAndFilter/NoResultFound";
import TripCard from "../../components/TripCard";

const SortBy = ["Rating", "Duration", "Clear"];
const LIMIT = 20;

const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [selectedSort, setSelectedSort] = useState(null);
  const [searchParams] = useSearchParams();
  const duration = searchParams.get("duration");
  const country = searchParams.get("country");
  const cities = searchParams.get("cities");
  const [trips, setTrips] = useState([]);
  console.log(trips.map((t) => t.userId.name));
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const api = useFetch();
  const setServerApiError = useError();
  const [count, setCount] = useState();
  // to calculate the filters numbers
  useEffect(() => {
    let total = 0;
    if (duration && duration !== "1-50") total += 1;
    if (country) total += 1;
    if (cities) total += 1;
    setCount(total);
  }, [duration, country, cities]);

  // Debounce the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);
    return () => clearTimeout(handler);
  }, [search]);

  // Reset trips and skip when filters/search/sort change
  useEffect(() => {
    setTrips([]);
    setSkip(0);
    setHasMore(true);
  }, [debouncedSearch, selectedSort, duration, country, cities]);

  // Fetch trips when skip or filters change
  useEffect(() => {
    fetchTrips();
  }, [skip, debouncedSearch, selectedSort, duration, country, cities]);

  const fetchTrips = async () => {
    try {
      const params = new URLSearchParams();
      if (debouncedSearch.trim())
        params.append("title", debouncedSearch.trim());
      if (selectedSort && selectedSort !== "Clear")
        params.append("sort", selectedSort.toLowerCase());
      if (duration) params.append("duration", duration);
      if (country) params.append("country", country);
      if (cities) params.append("cities", cities);
      params.append("limit", LIMIT);
      params.append("skip", skip);

      const url = `/trips?${params.toString()}`;
      const data = await api.get(url);

      setTrips((prev) => [...prev, ...data]);
      if (data.length < LIMIT) setHasMore(false);
    } catch (err) {
      console.error("Failed to fetch trips: ", err);
      setServerApiError(err.message);
    }
  };

  const handleShowMore = () => {
    setSkip((prev) => prev + LIMIT);
  };

  return (
    <div className="relative">
      <div className="search-container m-10 flex justify-center gap-4 flex-wrap p-4">
        <SearchInput search={search} setSearch={setSearch} />

        <FilterButton
          onClick={() => {
            const params = new URLSearchParams(window.location.search);
            navigate(`/filters?${params.toString()}`);
          }}
          count={count}
        />

        <DropDownMenu
          name={"Sort by"}
          items={SortBy}
          onClick={(item) => setSelectedSort(item === "Clear" ? null : item)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-20">
        {trips.map((trip) => (
          <Link to={`/trips/${trip._id}`} key={trip._id}>
            <TripCard
              trip={{
                title: trip.title,
                coverPhoto: trip.coverPhotoUrl,
                country:
                  trip.countries && trip.countries.length > 0
                    ? trip.countries[0].name
                    : "Unknown",
                duration: `${trip.duration} days`,
                rating: trip.creatorRating || 0,
                timesCopied: trip.timesCopied || 0,
                userId: {
                  name: trip.userId.name,
                  surname: trip.userId.surname,
                },
              }}
            />
          </Link>
        ))}
      </div>
      {trips.length === 0 && <NoResultFound />}

      {hasMore && (
        <span
          onClick={handleShowMore}
          className=" show-more block text-center mt-4 cursor-pointer text-accent hover:underline"
        >
          Show more
        </span>
      )}

      <Outlet />
    </div>
  );
};

export default Home;
