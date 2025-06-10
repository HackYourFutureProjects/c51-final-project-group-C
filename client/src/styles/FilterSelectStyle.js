const accentColor = "accent";

export const FilterStyle = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "#fff",
    borderColor: accentColor,
    padding: "0.25rem 0.5rem",
    borderRadius: "0.5rem",
    boxShadow: state.isFocused ? `0 0 0 2px ${accentColor}40` : "none",
    "&:hover": {
      borderColor: accentColor,
    },
    minHeight: "48px",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? `${accentColor}10` : "#fff",
    color: accentColor,
  }),
  singleValue: (base) => ({
    ...base,
    color: accentColor,
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: `${accentColor}20`,
    color: accentColor,
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: accentColor,
  }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: "0",
    color: accentColor,
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
};
