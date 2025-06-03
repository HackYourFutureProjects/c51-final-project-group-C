const FormError = ({ message }) => {
  if (!message) return null;

  return (
    <div className="form-error text-red-500 text-md text-center bg-background flex items-center justify-center p-2 rounded-lg border border-accent">
      {message}
    </div>
  );
};

export default FormError;
