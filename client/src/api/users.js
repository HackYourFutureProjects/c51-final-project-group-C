// TODO: Update later with proper error handling

export const getUserById = async (userId) => {
  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    return response.json();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to load profile data. Please try again later.");
  }
};
