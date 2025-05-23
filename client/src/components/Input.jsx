function Input({ label, type = "text", placeholder, value, onChange }) {
  return (
    <div className="input-container flex flex-col mb-4 w-80">
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
        onChange={onChange}
        className=" input-field w-full p-2 rounded-xl border border-accent focus:outline-none focus:ring-2 focus:ring-accent transition"
      />
    </div>
  );
}

export default Input;
