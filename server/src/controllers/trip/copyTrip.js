import Trip from "../../models/Trip.js";
import Day from "../../models/Day.js";
import Activity from "../../models/Activity.js";
import { logError } from "../../util/logging.js";

export const copyTrip = async (req, res) => {
  try {
    const { tripId } = req.params;
    const userId = req.user.userId;

    // 👇 Find original trip user tries to copy
    const originalTrip = await Trip.findById(tripId).populate("countries");

    if (!originalTrip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    // 👇 Check if original trip is published (we can copy only published trips)
    if (!originalTrip.isPublished) {
      return res
        .status(400)
        .json({ message: "Only published trips can be copied" });
    }

    // 👇 Create new trip with basic data from original one
    const newTrip = new Trip({
      title: `Copy of ${originalTrip.title}`,
      duration: originalTrip.duration,
      countries: originalTrip.countries.map((country) => country._id),
      cities: originalTrip.cities,
      userId: userId,
      isPublished: false,
      coverPhotoUrl: originalTrip.coverPhotoUrl,
    });

    const savedNewTrip = await newTrip.save();

    // 👇 Increase a copy count for original trip
    originalTrip.timesCopied += 1;
    await originalTrip.save();

    // 👇 Copy days
    const originalDays = await Day.find({ tripId }).sort({ order: 1 });
    const newDayIds = [];

    for (const originalDay of originalDays) {
      const newDay = new Day({
        title: originalDay.title,
        dayNumber: originalDay.dayNumber,
        tripId: savedNewTrip._id,
        order: originalDay.order,
      });

      const savedDay = await newDay.save();
      newDayIds.push(savedDay._id);
    }

    // 👇 Link newly created days to the copied trip
    savedNewTrip.days = newDayIds;
    await savedNewTrip.save();

    // 👇 Copy activities (match by index)
    for (let i = 0; i < originalDays.length; i++) {
      const originalDay = originalDays[i];
      const newDayId = newDayIds[i];

      const activities = await Activity.find({ day: originalDay._id }).sort({
        order: 1,
      });

      for (const activity of activities) {
        // 👇 We copy activities from original trip to new (copied) one, but without personal fields (notes, photos, etc.)
        const newActivity = new Activity({
          title: activity.title,
          day: newDayId,
          location: activity.location,
          price: activity.price,
          order: activity.order,
        });

        await newActivity.save();

        // 👇 Add activity to a day
        await Day.findByIdAndUpdate(newDayId, {
          $push: { activities: newActivity._id },
        });
      }
    }

    const populatedNewTrip = await Trip.findById(savedNewTrip._id)
      .populate({
        path: "countries",
        select: "name code",
      })
      .populate("days");

    res.status(201).json({
      trip: populatedNewTrip,
      message: "Trip copied successfully",
    });
  } catch (err) {
    logError(err);
    res
      .status(err.status || 500)
      .json({ message: err.message || "Server error" });
  }
};
