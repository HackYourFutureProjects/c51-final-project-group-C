// 👇 Search for locations with Nominatim API was moved to backend, as on client-side it is unstable due to CORS policy

import { logError } from "../../util/logging.js";

export const searchLocations = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res
        .status(400)
        .json({ message: "Query parameter 'q' is required" });
    }

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=5&addressdetails=1`,
      {
        headers: {
          "Accept-Language": "en-US,en;q=0.9",
        },
      },
    );

    if (!response.ok) {
      throw new Error(
        `Error. Nominatim API responded with status: ${response.status}`,
      );
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    logError(error);
    res.status(500).json({ message: "Failed to fetch location data" });
  }
};
