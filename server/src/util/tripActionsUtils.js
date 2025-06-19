// This file contains utility functions related to trips, that are repeated in multiple controllers
// (including operations with days and activities).

import Trip from "../models/Trip.js";
import Day from "../models/Day.js";
import Activity from "../models/Activity.js";
import Country from "../models/Country.js";
import { logError } from "./logging.js";

// 👇 Check if trip exists and return it

export const getTripIfExists = async (tripId) => {
  const trip = await Trip.findById(tripId);

  if (!trip) {
    throw { status: 404, message: "Trip not found" };
  }

  return trip;
};

// 👇 Check if user is the owner of the trip

export const checkUserIsOwner = (trip, userId) => {
  const tripUserId = trip.userId;

  if (tripUserId.toString() !== userId) {
    throw { status: 403, message: "Only the owner can modify this trip" };
  }
};

// 👇 Check if provided countries exist in database

export const validateCountries = async (countryIds) => {
  if (!countryIds || countryIds.length === 0) return;

  const existingCountries = await Country.countDocuments({
    _id: { $in: countryIds },
  });

  if (existingCountries !== countryIds.length) {
    throw { status: 400, message: "One or more country IDs are invalid." };
  }
};

// 👇 Check if day exists and belongs to trip

export const checkDayBelongsToTrip = async (dayId, tripId) => {
  const day = await Day.findById(dayId);

  if (!day) {
    throw { status: 404, message: "Day not found" };
  }

  if (day.tripId.toString() !== tripId) {
    throw { status: 400, message: "Day does not belong to this trip" };
  }

  return day;
};

// 👇 Get next day number for a trip

export const getNextDayNumber = async (tripId) => {
  const highestDay = await Day.findOne({ tripId }).sort({ dayNumber: -1 });
  return highestDay ? highestDay.dayNumber + 1 : 1;
};

// 👇 Get next order number for day in trip

export const getNextDayOrder = async (tripId) => {
  const lastDay = await Day.findOne({ tripId }).sort({ order: -1 });
  return lastDay ? lastDay.order + 1 : 0;
};

// 👇 Check if activity exists and belongs to day

export const checkActivityBelongsToDay = async (activityId, dayId) => {
  const activity = await Activity.findById(activityId);

  if (!activity) {
    throw { status: 404, message: "Activity not found" };
  }

  if (activity.day.toString() !== dayId) {
    throw { status: 400, message: "Activity does not belong to this day" };
  }

  return activity;
};

// 👇 Get next order number for activity in day

export const getNextActivityOrder = async (dayId) => {
  const lastActivity = await Activity.findOne({ day: dayId }).sort({
    order: -1,
  });
  return lastActivity ? lastActivity.order + 1 : 1;
};

// 👇 Get next activity number for a day

export const getNextActivityNumber = async (dayId) => {
  const lastActivity = await Activity.findOne({ day: dayId }).sort({
    activityNumber: -1,
  });
  return lastActivity ? lastActivity.activityNumber + 1 : 1;
};

// 👇 Update trip cities based on activities locations

export const updateTripCities = async (tripId) => {
  try {
    // 👇 Get all days for the trip
    const days = await Day.find({ tripId }).populate({
      path: "activities",
      select: "location",
    });

    // 👇 Get all unique cities from activities (using Set guaratees there are no duplicates)

    const cities = new Set();

    days.forEach((day) => {
      if (day.activities && day.activities.length > 0) {
        day.activities.forEach((activity) => {
          if (activity.location && activity.location.city) {
            const city = activity.location.city.trim();
            if (city) {
              cities.add(city);
            }
          }
        });
      }
    });

    // 👇 Update trip with unique cities

    await Trip.findByIdAndUpdate(tripId, {
      cities: Array.from(cities),
    });
  } catch (error) {
    logError("Error updating trip cities:", error);
  }
};
