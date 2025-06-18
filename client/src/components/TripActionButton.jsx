const TripActionButton = ({
  icon: Icon,
  label,
  onClick,
  isPrimary = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${
        isPrimary
          ? "bg-accent hover:opacity-95 text-white"
          : "bg-background border border-border hover:opacity-90 hover:border-accent text-gray-600 hover:text-accent"
      } flex items-center justify-center gap-3 py-4 px-6 rounded-lg transition-colors duration-200 w-full text-center`}
    >
      {Icon && <Icon className="w-5 h-5" />}
      <span className="text-base font-medium">{label}</span>
    </button>
  );
};

export default TripActionButton;
