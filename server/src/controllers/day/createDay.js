import Day from "../../models/Day.js";
import {
  getTripIfExists,
  checkUserIsOwner,
  getNextDayNumber,
  getNextDayOrder,
} from "../../util/tripActionsUtils.js";
import { logError } from "../../util/logging.js";

export const createDay = async (req, res) => {
  try {
    const { title, dayNumber } = req.body;
    const { tripId } = req.params;
    const userId = req.user.userId;

    if (!tripId) {
      return res.status(400).json({ message: "Trip ID is required" });
    }

    // 👇 Get trip and check ownership
    const trip = await getTripIfExists(tripId);
    checkUserIsOwner(trip, userId);

    // 👇 If dayNumber is not specified, set next one (+1)
    let nextDayNumber = dayNumber;
    if (!nextDayNumber) {
      nextDayNumber = await getNextDayNumber(tripId);
    }

    // 👇 Check if day with such number exists for this trip
    const existingDay = await Day.findOne({ tripId, dayNumber: nextDayNumber });
    if (existingDay) {
      return res
        .status(400)
        .json({ message: "Day with this number already exists for this trip" });
    }

    // 👇 Find the largest order number for correct sorting
    const nextOrder = await getNextDayOrder(tripId);

    // 👇 Create new day
    const newDay = new Day({
      title: title || `Day ${nextDayNumber}`,
      dayNumber: nextDayNumber,
      tripId,
      order: nextOrder || nextDayNumber,
    });

    const savedDay = await newDay.save();

    // 👇 Add new day id to days array of a trip, also update duration
    trip.days.push(savedDay._id);

    // 👇 If new day's number is larger then current trip duration, increase duration
    const currentDaysCount = await Day.countDocuments({ tripId });
    if (currentDaysCount > trip.duration) {
      trip.duration = currentDaysCount;
    }

    await trip.save();

    res.status(201).json(savedDay);
  } catch (err) {
    logError(err);
    res
      .status(err.status || 500)
      .json({ message: err.message || "Server error" });
  }
};
