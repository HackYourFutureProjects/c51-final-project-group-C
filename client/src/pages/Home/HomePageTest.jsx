import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import TripCard from "../../components/TripCard";
import useFetch from "../../hooks/useFetch";
import { useError } from "../../context/ErrorContext";
import SearchInput from "../../components/SearchAndFilter/SearchInput";
import FilterButton from "../../components/SearchAndFilter/FilterButton";
import DropDownMenu from "../../components/DropDownMenu";

const SortBy = ["Rating", "Duration", "Clear"];

const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  /* eslint-disable no-unused-vars */
  const [selectedSort, setSelectedSort] = useState(null);
  const [searchParams] = useSearchParams();
  const duration = searchParams.get("duration");
  const country = searchParams.get("country");
  const [count, setCount] = useState(0);

  const [publishedTrips, setPublishedTrips] = useState([]);
  const api = useFetch();
  const setServerApiError = useError();

  useEffect(() => {
    let total = 0;
    if (duration && duration !== "1-50") total += 1;
    if (country) total += 1;
    setCount(total);
  }, [duration, country]);

  useEffect(() => {
    fetchPublishedTrips();
  }, []);

  const fetchPublishedTrips = async () => {
    try {
      const data = await api.get("/trips/published");
      setPublishedTrips(data);
    } catch (err) {
      setServerApiError(err.message);
    }
  };

  return (
    <div className="relative">
      <h1 className="home-message flex justify-center mt-20">Welcome!</h1>

      {/* Поиск и фильтры — БЕЗ логики */}
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

      <div className="published-trips-section">
        <h2 className="text-xl font-semibold mb-4 ml-20">
          Published Trips (TEST)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-20">
          {publishedTrips.map((trip) => (
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
                }}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
