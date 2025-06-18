import { useError } from "../context/ErrorContext";
import { useLoading } from "../context/LoadingContext";

const useFetch = () => {
  const { startLoading, stopLoading } = useLoading();
  const { setServerApiError, setServerValidationErrors, clearAllServerErrors } =
    useError();

  const performFetch = async (
    route,
    method,
    body = null,
    loadingMessage = null,
  ) => {
    if (route.includes("api/")) {
      throw Error(
        "when using the useFetch hook, the route should not include the /api/ part",
      );
    }

    // 👇 This is to clear any errors from ErrorContext before making a new request to backend,
    // so previous errors will not will not be shown in the ErrorModal/FormError

    clearAllServerErrors();
    startLoading(loadingMessage);

    const isFormData = body instanceof FormData;

    const baseOptions = {
      method,
      credentials: "include",
      headers: isFormData ? {} : { "Content-Type": "application/json" },
      body: body ? (isFormData ? body : JSON.stringify(body)) : null,
    };

    try {
      const apiUrl = `/api${route}`;
      const response = await fetch(apiUrl, baseOptions);
      const data = await response.json();

      if (!response.ok) {
        // 👇 Here we check for validation errors and pass them to the ErrorContext, later on they will be rendered in FormError component
        if (response.status === 400 && data.validationErrors) {
          setServerValidationErrors(data.validationErrors);
        } else {
          // 👇 And here we check all other errors that are not validation errors and pass them to the ErrorContext, they will be rendered in ErrorModal
          setServerApiError(data.message || "Request failed");
        }
        throw new Error(data.message || "Request failed");
      }

      return data;
    } finally {
      stopLoading();
    }
  };

  const get = (route, loadingMessage) =>
    performFetch(route, "GET", null, loadingMessage);
  const post = (route, body, loadingMessage) =>
    performFetch(route, "POST", body, loadingMessage);
  const put = (route, body, loadingMessage) =>
    performFetch(route, "PUT", body, loadingMessage);
  const patch = (route, body, loadingMessage) =>
    performFetch(route, "PATCH", body, loadingMessage);
  const del = (route, body = null, loadingMessage) =>
    performFetch(route, "DELETE", body, loadingMessage);

  return {
    get,
    post,
    put,
    patch,
    del,
  };
};

export default useFetch;
