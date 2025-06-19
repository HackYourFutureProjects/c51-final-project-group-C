import { createContext, useContext, useState, useRef, useEffect } from "react";

const LoadingContext = createContext({});

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const timerRef = useRef(null);

  const SHOW_SPINNER_DELAY = 500; // Delay not to show spinner when loading is fast (to avoid spinner flickering)

  const startLoading = (message = null) => {
    if (timerRef.current) clearTimeout(timerRef.current);

    setIsLoading(true);
    setLoadingMessage(message);

    timerRef.current = setTimeout(() => {
      setShowSpinner(true);
    }, SHOW_SPINNER_DELAY);
  };

  const stopLoading = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    setIsLoading(false);
    setLoadingMessage(null);
    setShowSpinner(false);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        loadingMessage,
        showSpinner,
        startLoading,
        stopLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
