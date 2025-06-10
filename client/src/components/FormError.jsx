const FormError = ({ message }) => {
  if (!message) return null;
  return (
    <div className="form-error text-[#bd5151] text-sm text-center bg-[#e3c5c5] flex items-center justify-center p-2 rounded-lg border border-[#bd5151]">
      {message}
    </div>
  );
};

export default FormError;
