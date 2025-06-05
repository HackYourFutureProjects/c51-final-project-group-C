const TripActionButton = ({
  icon: Icon,
  label,
  onClick,
  isPrimary = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${isPrimary ? "bg-accent hover:opacity-95 text-white" : "hover:opacity-90 text-accent bg-background border border-accent"} flex items-center justify-center gap-2 py-3 px-6 rounded-lg transition-colors duration-300`}
    >
      {Icon && <Icon className="w-5 h-5" />}
      <span className="text-base font-medium">{label}</span>
    </button>
  );
};

export default TripActionButton;
