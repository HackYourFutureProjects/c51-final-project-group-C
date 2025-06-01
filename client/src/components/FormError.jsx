const FormError = ({ error, validationErrors }) => {
  // If user in not logged in, server returns 401 status code;
  // Tecnically it's an error, but we don't want to show it to the user, as it's expected behavior
  const shouldShowError = error && error !== "Not authenticated";
  const message =
    validationErrors?.[0]?.message || (shouldShowError ? error : null);

  if (!message) return null;

  return (
    <div className="form-error text-red-500 text-md text-center bg-background flex items-center justify-center p-2 rounded-lg border border-accent">
      {message}
    </div>
  );
};

export default FormError;
