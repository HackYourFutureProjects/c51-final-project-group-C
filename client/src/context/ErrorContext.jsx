import { createContext, useContext, useState } from "react";

const ErrorContext = createContext({});

export const ErrorProvider = ({ children }) => {
  const [serverApiError, setServerApiError] = useState(null);
  const [serverValidationErrors, setServerValidationErrors] = useState([]);

  // Since we don't show all validation errors at once (under each input), we need to get
  // the first one from validationErrors array that will be displayed in FormError component
  const firstServerError =
    serverValidationErrors.length > 0
      ? serverValidationErrors[0].message
      : serverApiError;

  const clearAllServerErrors = () => {
    setServerApiError(null);
    setServerValidationErrors([]);
  };

  return (
    <ErrorContext.Provider
      value={{
        serverApiError,
        serverValidationErrors,
        firstServerError,
        setServerApiError,
        setServerValidationErrors,
        clearAllServerErrors,
      }}
    >
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const context = useContext(ErrorContext);
  if (context === undefined) {
    throw new Error("useError must be used within an ErrorProvider");
  }
  return context;
};
