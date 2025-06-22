// This  page has two versions, depending if user is viewing his own profile or someone else's profile.
// Layout and content will be different.

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getUserById } from "../api/users";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import {
  LuMap as MapIcon,
  LuCheck as CheckIcon,
  LuBookmark as BookmarkIcon,
  LuCalendarClock as CalendarIcon,
  LuSettings as SettingsIcon,
  LuX as XIcon,
} from "react-icons/lu";
import Tabs from "../components/Tabs";
import Grid from "../components/Grid";
import ProfilePageSidebar from "../components/ProfilePageSidebar";
import ProfileInfo from "../components/ProfileInfo";
import TripCard from "../components/TripCard";
import ProfileSettings from "../components/ProfileSettings";
import { allTrips } from "../assets/dummyData/mockTripData";

const tripsToShow = allTrips.slice(0, 4);

// 👇 If user is viewing his own profile, we show these tabs:

const tabsForPrivateProfileView = [
  { id: "published-trips", label: "Published Trips", icon: CheckIcon },
  { id: "draft-trips", label: "Unpublished Drafts", icon: CalendarIcon },
  { id: "bookmarks", label: "Bookmarks", icon: BookmarkIcon },
  { id: "settings", label: "Settings", icon: SettingsIcon },
];

// 👇 If user is viewing someone else's profile, we show another ones:

const tabsForPublicProfileView = [
  { id: "map", label: "Map", icon: MapIcon },
  { id: "published", label: "Published", icon: CheckIcon },
];

const ProfilePage = () => {
  const { user } = useAuth(); // to get the id from AuthContext in case if user is viewing his own profile
  const { userId } = useParams(); // to get the id from the URL in case if user is viewing someone else's profile
  const navigate = useNavigate();

  // 👇 For own profile url is '/users/me', for another person's profile it's 'users/:id'.
  //   But it is also possible to open your own profile through public link with '/users/:id'. We need to check this case to redirect user to '/users/me'.
  const isOwnProfilePublicUrl = user?.id === userId;

  // 👇 Depending on this variable we will show different layout/content
  const isOwnProfile = !userId || isOwnProfilePublicUrl;

  const api = useFetch();

  const [bookmarkedTrips, setBookmarkedTrips] = useState([]);
  const [publishedTrips, setPublishedTrips] = useState([]);
  const [draftTrips, setDraftTrips] = useState([]);

  const [profileInfo, setProfileInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTabId, setActiveTabId] = useState(null);
  // ☝️ Tricky: We don't set active tab here. That's because active tab depends on isOwnProfile variable that can be unavailable at the first render.
  // 👇 So we set active tab in useEffect to wait for isOwnProfile to be initialized.
  useEffect(() => {
    setActiveTabId(isOwnProfile ? "published-trips" : "published");
  }, [isOwnProfile]);

  useEffect(() => {
    // 👇 If user tries to view his own profile through public link('/users/:id') we redirect to '/users/me'
    if (user?.id && userId === user.id) {
      navigate("/users/me", { replace: true });
      return;
    }

    const loadProfileInfo = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (isOwnProfile && user) {
          setProfileInfo(user);
        } else if (userId) {
          const data = await getUserById(userId);
          setProfileInfo(data);
        }
      } catch (err) {
        console.error("Error loading profile:", err);
        setError("Failed to load profile data");
      } finally {
        setIsLoading(false);
      }
    };

    loadProfileInfo();
  }, [userId, isOwnProfile, user, navigate]);

  // Fetch the bookmarked trips
  useEffect(() => {
    if (activeTabId === "bookmarks" && isOwnProfile) {
      const fetchBookmarkedTrips = async () => {
        try {
          const data = await api.get(
            "/users/me/bookmarks",
            "Fetching bookmarked trips",
          );

          setBookmarkedTrips(data.trips || []);
        } catch (err) {
          console.error("Failed to fetch bookmarked trips:", err);
        }
      };

      fetchBookmarkedTrips();
    }
  }, [activeTabId, isOwnProfile]);

  // Fetch published and draft trips
  useEffect(() => {
    if (!profileInfo) return;

    if (isOwnProfile) {
      if (activeTabId === "published-trips") {
        const fetchPublishedTrips = async () => {
          try {
            const data = await api.get(
              `/users/${user.id}/trips`,
              "Fetching published trips",
            );
            setPublishedTrips(data.trips || []);
          } catch (err) {
            console.error("Failed to fetch published trips:", err);
          }
        };

        fetchPublishedTrips();
      } else if (activeTabId === "draft-trips") {
        const fetchDraftTrips = async () => {
          try {
            const data = await api.get(
              "/users/me/drafts",
              "Fetching draft trips",
            );
            setDraftTrips(data.trips || []);
          } catch (err) {
            console.error("Failed to fetch draft trips:", err);
          }
        };

        fetchDraftTrips();
      }
    } else if (userId && activeTabId === "published") {
      const fetchUserPublishedTrips = async () => {
        try {
          const data = await api.get(
            `/users/${userId}/trips`,
            "Fetching user's published trips",
          );
          setPublishedTrips(data.trips || []);
        } catch (err) {
          console.error("Failed to fetch user published trips:", err);
        }
      };

      fetchUserPublishedTrips();
    }
  }, [activeTabId, isOwnProfile, profileInfo, userId, user]);

  // 👇 We will have better error/loading handling later on

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (!profileInfo) {
    return <div className="text-center py-8">User not found</div>;
  }

  const normalizeTripForCard = (trip) => ({
    ...trip,
    coverPhoto: trip.coverPhoto ?? trip.coverPhotoUrl ?? null, // use existing coverPhoto if present
    country:
      trip.country ??
      (trip.countries && trip.countries.length > 0
        ? trip.countries.map((c) => c.name).join(", ")
        : undefined),
    rating:
      trip.rating ??
      (trip.creatorRating !== undefined && trip.creatorRating !== null
        ? trip.creatorRating
        : undefined),
  });

  // 👇 Private View Layout (how user sees his own profile)

  const renderPrivateView = () => {
    const renderPrivateTabContent = () => {
      switch (activeTabId) {
        case "settings":
          return <ProfileSettings />;
        case "bookmarks":
          return bookmarkedTrips.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[300px] py-20 text-center">
              <BookmarkIcon className="w-12 h-12 mb-4 text-gray-400" />
              <p className="text-gray-400 font-sm mb-6">
                You do not have any bookmarked trips yet.
              </p>
            </div>
          ) : (
            <Grid columns={3}>
              {bookmarkedTrips.map((trip) => (
                <Link to={`/trips/${trip._id}`} key={trip._id}>
                  <TripCard key={trip._id} trip={normalizeTripForCard(trip)} />
                </Link>
              ))}
            </Grid>
          );
        case "published-trips":
          return publishedTrips.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[300px] py-20 text-center">
              <XIcon className="w-12 h-12 mb-4 text-gray-400" />
              <p className="text-gray-400  font-sm mb-6">
                You do not have any published trips yet.
              </p>
            </div>
          ) : (
            <Grid columns={3}>
              {publishedTrips.map((trip) => (
                <Link to={`/trips/${trip._id}`} key={trip._id}>
                  <TripCard key={trip._id} trip={normalizeTripForCard(trip)} />
                </Link>
              ))}
            </Grid>
          );
        case "draft-trips":
          return draftTrips.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[300px] py-20 text-center">
              <CalendarIcon className="w-12 h-12 mb-4 text-gray-400" />
              <p className="text-gray-400 font-sm mb-6">
                You do not have any draft trips yet.
              </p>
            </div>
          ) : (
            <Grid columns={3}>
              {draftTrips.map((trip) => (
                <Link to={`/trips/${trip._id}`} key={trip._id}>
                  <TripCard key={trip._id} trip={normalizeTripForCard(trip)} />
                </Link>
              ))}
            </Grid>
          );
        default:
          return (
            <Grid columns={3}>
              {tripsToShow.map((trip) => (
                <TripCard key={trip._id} trip={trip} />
              ))}
            </Grid>
          );
      }
    };

    return (
      <div className="profile-layout pt-16 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <ProfilePageSidebar
          profileInfo={profileInfo}
          activeTabId={activeTabId}
          onTabChange={setActiveTabId}
          tabItems={tabsForPrivateProfileView}
        />

        {/* 👇  Content Container */}
        <div className="content-container lg:col-span-3 w-full min-h-[calc(100vh-8rem)]">
          {renderPrivateTabContent()}
        </div>
      </div>
    );
  };

  // 👇 Public View Layout (how user sees someone else's profile)

  const renderPublicView = () => {
    const renderTabsContent = () => {
      if (activeTabId === "map") {
        return (
          <div className="map-container h-[500px] bg-background rounded-lg flex items-center justify-center border border-border">
            <MapIcon className="map-icon w-6 h-6 mr-2" />
            <span className="map-text text-2xl">Map</span>
          </div>
        );
      }

      if (activeTabId === "published" && publishedTrips.length === 0) {
        return (
          <div className="flex flex-col items-center justify-center h-[300px] py-20 text-center">
            <CheckIcon className="w-12 h-12 mb-4 text-gray-400" />
            <p className="text-gray-400 font-medium mb-6">
              {profileInfo.name || "This user"} has not published any trips yet.
            </p>
          </div>
        );
      }

      return (
        <Grid columns={4}>
          {publishedTrips.map((trip) => (
            <Link to={`/trips/${trip._id}`} key={trip._id}>
              <TripCard key={trip._id} trip={normalizeTripForCard(trip)} />
            </Link>
          ))}
        </Grid>
      );
    };

    return (
      <div className="public-profile space-y-8">
        <div className="profile-header text-center space-y-4">
          <ProfileInfo profileInfo={profileInfo} />
        </div>

        <div className="tabs-container border-b border-border">
          <Tabs
            items={tabsForPublicProfileView}
            activeTabId={activeTabId}
            onChange={setActiveTabId}
            type="horizontal"
          />
        </div>

        {renderTabsContent()}
      </div>
    );
  };

  // 👇 Depending on isOwnProfile variable we render private or public view

  return (
    <div className="profile-page max-w-7xl mx-auto px-4 py-8">
      {isOwnProfile ? renderPrivateView() : renderPublicView()}
    </div>
  );
};

export default ProfilePage;
