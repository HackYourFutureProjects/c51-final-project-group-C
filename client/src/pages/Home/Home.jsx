import { Link, Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import useFetch from "../../hooks/useFetch";
import { useError } from "../../context/ErrorContext";
import FilterButton from "../../components/SearchAndFilter/FilterButton";
import SearchInput from "../../components/SearchAndFilter/SearchInput";
import DropDownMenu from "../../components/DropDownMenu";
import NoResultFound from "../../components/SearchAndFilter/NoResultFound";
import HeroSection from "../../components/HeroSection";
import Cards from "../../components/Cards";

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
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const api = useFetch();
  const setServerApiError = useError();
  const [count, setCount] = useState();

  const searchBarRef = useRef(null);

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

  // Scroll to search bar when filters or search change
  useEffect(() => {
    if (searchBarRef.current) {
      searchBarRef.current.scrollIntoView({ behavior: "smooth" });
    }
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
    <div className="relative pt-24 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-11">
      <HeroSection />

      <section className="max-w-screen-xl mx-auto px-4 py-8 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-text mb-3">
          Where will your next trip be?
        </h2>
        <p className="max-w-2xl mx-auto text-text/70 text-lg font-light">
          See all the trips, get inspired, and maybe even copy one to start your
          own adventure.
        </p>
      </section>

      {/* Search & Filter Bar */}
      <div
        ref={searchBarRef}
        className="flex flex-wrap items-center justify-center gap-4 px-4 py-4 sm:px-6 lg:px-8"
      >
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

      {/* Trip Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8 py-8">
        {trips.map((trip) => (
          <Link to={`/trips/${trip._id}`} key={trip._id}>
            <Cards
              trip={{
                ...trip,
                coverPhoto: trip.coverPhotoUrl,
                country: trip.countries?.[0]?.name || "Unknown",
                duration: `${trip.duration} days`,
                rating: trip.creatorRating ?? 0,
                timesCopied: trip.timesCopied ?? 0,
                timesBookmarked: trip.timesBookmarked ?? 0,
                userId: {
                  name: trip.userId?.name,
                  surname: trip.userId?.surname,
                  profileImageUrl: trip.userId?.profileImageUrl,
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
          className="block text-center mt-4 cursor-pointer text-accent hover:underline"
        >
          Show more
        </span>
      )}

      <Outlet />
    </div>
  );
};

export default Home;
