import { useState } from "react";
import { turnDateStringToRelativeFormat } from "../../util/utils";
import Grid from "../../components/Grid";
import TripCard from "../../components/TripCard";
import Tabs from "../../components/Tabs";
import DayAccordion from "../../components/DayAccordion/DayAccordion";
import TripEvent from "../../components/DayAccordion/TripEvent/TripEvent";
import Avatar from "../../components/Avatar";
import TripInfoLabel from "../../components/TripInfoLabel";
import TripActionButton from "../../components/TripActionButton";
import ReviewCard from "../../components/ReviewCard";

import {
  LuCalendar as CalendarIcon,
  LuMapPin as LocationIcon,
  LuClock as ClockIcon,
  LuBookmark as BookmarkIcon,
  LuCopy as CopyIcon,
  LuStar as StarIcon,
  LuImage as ImageIcon,
  LuMap as MapIcon,
} from "react-icons/lu";

import { mockTripData, allTrips } from "../../assets/dummyData/mockTripData";

const PublishedTripPage = () => {
  const [trip] = useState(mockTripData);
  const [activeTabId, setActiveTabId] = useState("cover-photo");

  const similarTrips = allTrips
    .filter((t) => t.country === trip.countries[0].name && t._id !== trip._id)
    .slice(0, 4);

  // Tabs for Photo Cover / Photo Map

  const tabItems = [
    { id: "cover-photo", label: "Photo Cover", icon: ImageIcon },
    { id: "photo-map", label: "Photo Map", icon: MapIcon },
  ];

  const handleBookmark = () => {
    // We will add the functionality later
  };

  const handleCopyTrip = () => {
    // Same, we will add the functionality later
  };

  return (
    <div className="trip-page mt-10">
      {/* Page content */}
      <div className="trip-content max-w-5xl mx-auto px-4 py-8">
        {/* Trip Header Section */}
        <section className="trip-header-section mb-8">
          <h1 className="trip-title text-5xl md:text-5xl text-3xl font-bold mb-8 flex items-center justify-between">
            {trip.title}
          </h1>

          {/* Author and Date Published */}
          <div className="trip-author-stats flex flex-col gap-4 mb-6 text-xs">
            <div className="author-row flex items-center gap-2 whitespace-nowrap">
              <span className="text-gray-500">Published by</span>
              <Avatar size="small" />
              <span className="font-medium whitespace-nowrap">
                {trip.user.name} {trip.user.surname}
              </span>
              <div className="published-date flex items-center whitespace-nowrap">
                <CalendarIcon className="w-5 h-5 mx-2" />
                <span>{turnDateStringToRelativeFormat(trip.createdAt)}</span>
              </div>
            </div>

            {/* Trip general info (Pills Labels)*/}
            <div className="trip-general-info flex flex-wrap gap-4 text-xs">
              <TripInfoLabel
                icon={LocationIcon}
                label="Country"
                value={trip.countries[0].name}
              />

              <TripInfoLabel
                icon={ClockIcon}
                label="Duration"
                value={`${trip.duration} days`}
              />

              <TripInfoLabel
                icon={StarIcon}
                label="Rating"
                value={`${trip.rating}/5`}
              />

              <TripInfoLabel
                icon={CopyIcon}
                label="Copied"
                value={`${trip.timesCopied} times`}
              />

              <TripInfoLabel
                icon={BookmarkIcon}
                label="Bookmarked"
                value={`${trip.timesBookmarked} times`}
              />
            </div>
          </div>

          {/* Trip Action Buttons (Copy and Bookmark) */}

          <div className="trip-actions flex flex-wrap gap-4 mb-8 justify-start">
            <TripActionButton
              icon={BookmarkIcon}
              label="Add to Bookmarks"
              onClick={handleBookmark}
              isPrimary={false}
            />

            <TripActionButton
              icon={CopyIcon}
              label="Copy Trip"
              onClick={handleCopyTrip}
              isPrimary={true}
            />
          </div>
        </section>

        {/* Tabs for Cover photo and Photo Map */}
        <section className="trip-cover-section mb-8">
          {/* Tab buttons */}
          <Tabs
            items={tabItems}
            activeTabId={activeTabId}
            onChange={setActiveTabId}
            type="horizontal"
          />

          {/* Tab content */}
          <div className="rounded-xl overflow-hidden border border-border mt-4">
            {/* Photo cover tab */}
            {activeTabId === "cover-photo" ? (
              <img
                src={trip.coverPhoto}
                alt={`${trip.title} cover`}
                className="w-full h-[400px] object-cover"
              />
            ) : (
              <>
                {/* Photo cover tab */}

                <div className="h-[400px] w-full flex items-center justify-center rounded-xl">
                  Photo Map will appear here later (hopefully)
                </div>
              </>
            )}
          </div>
        </section>

        {/* Trip days Accordions Section */}

        <section className="trip-days-section">
          <div className="trip-days space-y-6">
            {trip.days.map((day) => (
              <div key={day._id}>
                <DayAccordion
                  title={day.title}
                  dayNumber={day.dayNumber}
                  defaultOpen={false}
                >
                  <div className="day-events">
                    {day.events.map((event, eventIndex) => (
                      <TripEvent
                        key={event._id}
                        event={event}
                        eventNumber={eventIndex + 1}
                        isLastEvent={eventIndex === day.events.length - 1}
                      />
                    ))}
                  </div>
                </DayAccordion>
              </div>
            ))}
          </div>
        </section>

        {/* Trip Author Review */}

        <section className="trip-author-review-section mb-16 p-12 mt-16 rounded-lg border border-border">
          <h4 className="review-section-title text-2xl font-semibold mb-4 mb-8">
            Overall Trip Review
          </h4>
          <div className="flex flex-col gap-8">
            {/* Trip Author info */}

            <div className="flex items-center gap-4">
              <Avatar size="large" />
              <div>
                <h3 className="font-medium">
                  {trip.user.name} {trip.user.surname}
                </h3>
                <h4 className="font-medium text-sm italic">
                  {trip.user.country}
                </h4>
              </div>
            </div>

            {/* Trip Author Review text */}
            <div>
              <p className="text-gray-700 italic text-sm">
                `&ldquo;`{trip.authorReview}`&ldquo;`
              </p>
            </div>
          </div>

          {/* Trip Author Rating */}

          <div className="flex items-center justify-end mt-4 gap-2">
            <StarIcon className="w-6 h-6" />
            <span className="text-lg font-semibold">{trip.rating}/5</span>
          </div>
        </section>

        {/* Other Travelers Reviews Section */}

        <section className="other-travelers-reviews-section mt-16">
          <h4 className="other-travelers-reviews-section-title text-2xl font-semibold mb-8">
            Other Travelers Reviews
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ReviewCard
              user={trip.reviews[0].user}
              text={trip.reviews[0].text}
            />

            <ReviewCard
              user={trip.reviews[1].user}
              text={trip.reviews[1].text}
            />
          </div>
        </section>

        {/* Trip Action Buttons (Copy and Bookmark) */}

        <section className="trip-action-buttons-section mt-16">
          <div className="action-buttons-large flex flex-wrap gap-4 justify-center">
            <TripActionButton
              icon={BookmarkIcon}
              label="Add to Bookmarks"
              onClick={handleBookmark}
              isPrimary={false}
            />

            <TripActionButton
              icon={CopyIcon}
              label="Copy Trip"
              onClick={handleCopyTrip}
              isPrimary={true}
            />
          </div>
        </section>

        {/* Similar Trips Section */}

        <section className="similar-trips-section mt-16">
          <h2 className="text-2xl font-semibold mb-4">Similar Trips</h2>
          <Grid columns={4}>
            {similarTrips.map((similarTrip) => (
              <TripCard key={similarTrip._id} trip={similarTrip} />
            ))}
          </Grid>
        </section>
      </div>
    </div>
  );
};

export default PublishedTripPage;
