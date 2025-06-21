import Trip from "../../models/Trip.js";
import Day from "../../models/Day.js";
import User from "../../models/User.js";
import { validateCountries } from "../../util/tripActionsUtils.js";
import { logError } from "../../util/logging.js";

export const createTrip = async (req, res) => {
  try {
    const { title, duration, countries } = req.body;
    const userId = req.user.userId;

    // 👇 Check if provided countries exist in database
    await validateCountries(countries);

    // 👇 Create new Trip object (based on info provided in CreateTripModal)
    const newTrip = new Trip({
      title,
      duration,
      countries,
      cities: [],
      userId,
    });

    const savedTrip = await newTrip.save();

    // 👇 We also automatically generate days in a new trip (based on duration user provided in CreateTripModal)
    const daysToCreate = [];

    for (let i = 1; i <= duration; i++) {
      daysToCreate.push({
        title: `Day ${i}`, // Default title for a day
        dayNumber: i,
        tripId: savedTrip._id,
        order: i,
        activities: [],
      });
    }

    if (daysToCreate.length > 0) {
      const createdDays = await Day.insertMany(daysToCreate);

      // 👇 Add created day IDs to 'days' field in Trip and save
      savedTrip.days = createdDays.map((day) => day._id);
      await savedTrip.save();
    }

    // 👇 Get user data to include in response
    const user = await User.findById(userId).select(
      "name surname _id profileImageUrl",
    );

    // Populate countries with name and code
    const populatedTrip = await Trip.findById(savedTrip._id)
      .populate({
        path: "countries",
        select: "name code",
      })
      .populate("days");

    const tripResponse = populatedTrip.toObject();

    tripResponse.user = user ? user.toObject() : null;
    if (tripResponse.user) {
      tripResponse.user.id = tripResponse.user._id;
    }

    // Delete the userId field as we're providing the user object
    delete tripResponse.userId;

    res
      .status(201)
      .json({ message: "Trip created successfully", trip: tripResponse });
  } catch (error) {
    logError(error);
    res
      .status(error.status || 500)
      .json({ message: error.message || "Server error" });
  }
};
