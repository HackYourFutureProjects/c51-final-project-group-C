import { useState } from "react";

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);

  const performFetch = async (route, method, body = null) => {
    if (route.includes("api/")) {
      throw Error(
        "when using the useFetch hook, the route should not include the /api/ part",
      );
    }

    setIsLoading(true);
    setError(null);
    setValidationErrors([]);

    const baseOptions = {
      method,
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    };

    const options = { ...baseOptions };
    if (body) {
      options.body = JSON.stringify(body);
    }

    try {
      const apiUrl = route.startsWith("/api") ? route : `/api${route}`;
      const response = await fetch(apiUrl, options);
      const data = await response.json();

      if (!response.ok) {
        const isValidation = response.status === 400 && data.validationErrors;
        if (isValidation) setValidationErrors(data.validationErrors);
        throw new Error(data.message || (isValidation ? "Validation failed" : "Request failed"));
      }

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const get = (route) => performFetch(route, "GET");
  const post = (route, body) => performFetch(route, "POST", body);
  const put = (route, body) => performFetch(route, "PUT", body);
  const del = (route) => performFetch(route, "DELETE");

  const resetErrors = () => {
    setError(null);
    setValidationErrors([]);
  };

  return {
    isLoading,
    error,
    validationErrors,
    get,
    post,
    put,
    del,
    resetErrors
  };
};

export default useFetch;
