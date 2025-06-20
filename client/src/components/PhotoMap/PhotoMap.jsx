import { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import PhotoMapPin from "./PhotoMapPin";
import "leaflet/dist/leaflet.css";
import "./PhotoMap.css";

// 👇 This is to fix Leaflet map bug with default icon, described in many sources

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const PhotoMap = ({ days = [] }) => {
  const [mapReady, setMapReady] = useState(false);

  // 👇 Collect all activities from all days

  const allActivities = days.reduce((acc, day) => {
    if (day.activities && day.activities.length > 0) {
      return [...acc, ...day.activities];
    }
    return acc;
  }, []);

  // 👇 Filter only activities that both have photos and location

  const activitiesWithPhotosAndLocation = allActivities.filter(
    (activity) =>
      activity.activityPhotoUrls?.length > 0 &&
      activity.location?.lat &&
      activity.location?.lng,
  );

  // 👇 Here we create a unique key for locations to force map re-render when location change

  const locationsKey = useMemo(() => {
    return activitiesWithPhotosAndLocation
      .map(
        (activity) =>
          `${activity._id}-${activity.location.lat.toFixed(6)}-${activity.location.lng.toFixed(6)}`,
      )
      .join("-");
  }, [activitiesWithPhotosAndLocation]);

  useEffect(() => {
    setMapReady(true);
  }, []);

  // 👇 If there are no activities with photos and location, we show a placeholder

  if (activitiesWithPhotosAndLocation.length === 0) {
    return (
      <div className="h-[450px] w-full flex items-center justify-center rounded-xl bg-background">
        <p className="text-gray-500">
          No photos with locations available for this trip
        </p>
      </div>
    );
  }

  // 👇 This will calculate which part of map that will be visible by default (based on coordinates of activities locations)

  const getMapViewPortBoundaries = () => {
    const points = activitiesWithPhotosAndLocation.map((activity) => [
      activity.location.lat,
      activity.location.lng,
    ]);

    // 👇 .pad(0.2) will add 20% padding to the boundaries, to make sure all activities are in a map viewport

    return L.latLngBounds(points).pad(0.2);
  };

  // 👇 This will calculate the center of the map (average of all activities locations)

  const getCenter = () => {
    if (activitiesWithPhotosAndLocation.length === 1) {
      const activity = activitiesWithPhotosAndLocation[0];
      return [activity.location.lat, activity.location.lng];
    }

    const bounds = getMapViewPortBoundaries();
    return bounds.getCenter();
  };

  return (
    <div className="photo-map-container">
      <MapContainer
        center={getCenter()}
        bounds={
          activitiesWithPhotosAndLocation.length > 1
            ? getMapViewPortBoundaries()
            : null
        }
        zoom={activitiesWithPhotosAndLocation.length === 1 ? 13 : undefined}
        style={{ height: "100%", width: "100%" }}
        key={`map-${locationsKey}`}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {/* 👇If map is ready, we show photo map pins for each valid activity */}

        {mapReady &&
          activitiesWithPhotosAndLocation.map((activity) => (
            <PhotoMapPin key={activity._id} activity={activity} />
          ))}
      </MapContainer>
    </div>
  );
};

export default PhotoMap;
