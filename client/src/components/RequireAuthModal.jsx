import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Modal from "./Modal";

const RequireAuthModal = () => {
  const { showRequireAuth, closeRequireAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    closeRequireAuth();
    navigate("/login");
  };

  const handleRegister = () => {
    closeRequireAuth();
    navigate("/register");
  };

  return (
    <Modal
      isOpen={showRequireAuth}
      onClose={closeRequireAuth}
      title="Authentication Required"
      body={
        <div className="text-center">
          <p className="mb-4">
            This feature is only available to logged-in users. Please log in or
            create an account to continue.
          </p>
        </div>
      }
      actionLabel="Log In"
      onSubmit={handleLogin}
      secondaryAction={handleRegister}
      secondaryActionLabel="Register"
    />
  );
};

export default RequireAuthModal;
