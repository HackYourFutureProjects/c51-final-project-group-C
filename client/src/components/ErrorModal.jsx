import { useState, useEffect } from "react";
import { useError } from "../context/ErrorContext";
import Modal from "./Modal";

// ErrorModal is is for all errors, that are not validation errors (that are shown in FormError component)

const ErrorModal = () => {
  const { serverApiError, clearAllServerErrors } = useError();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (serverApiError) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [serverApiError]);

  const handleClose = () => {
    setIsVisible(false);
    clearAllServerErrors();
  };

  const errorBody = (
    <div className="flex flex-col items-center text-center">
      <p className="text-gray-700">{serverApiError}</p>
    </div>
  );

  return (
    <Modal
      isOpen={isVisible && !!serverApiError}
      onClose={handleClose}
      title="Error"
      body={errorBody}
      actionLabel="Close"
      onSubmit={handleClose}
      showCloseButton={true}
    />
  );
};

export default ErrorModal;
