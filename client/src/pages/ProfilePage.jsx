import { useAuth } from "../context/AuthContext";

// Placeholder, will be updated soon

const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl mb-6">Profile</h1>

      <div className="space-y-6">
        <div>
          <p className="text-gray-500">First Name</p>
          <p>{user.name || "Not set"}</p>
        </div>

        <div>
          <p className="text-gray-500">Last Name</p>
          <p>{user.surname || "Not set"}</p>
        </div>

        <div>
          <p className="text-gray-500">Country</p>
          <p>{user.country || "Not set"}</p>
        </div>

        <div>
          <p className="text-gray-500">Email</p>
          <p>{user.email}</p>
        </div>

        <div>
          <p className="text-gray-500">Profile Status</p>
          <p
            className={
              user.isProfileCompleted ? "text-green-600" : "text-red-500"
            }
          >
            {user.isProfileCompleted ? "Complete" : "Incomplete"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
