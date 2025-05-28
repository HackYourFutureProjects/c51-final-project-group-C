function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  min,
  max,
}) {
  return (
    <div className="relative w-full">
      {label && (
        <label
          className=" input-label mb-1 text-text font-medium"
          htmlFor={label}
        >
          {label}
        </label>
      )}
      <input
        id={label}
        type={type}
        placeholder={placeholder}
        value={value}
        autoComplete="off"
        onChange={onChange}
        min={min}
        max={max}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all text-gray-900 text-base"
      />
    </div>
  );
}

export default Input;
