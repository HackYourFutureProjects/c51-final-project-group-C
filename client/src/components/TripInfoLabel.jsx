const TripInfoLabel = ({ icon: Icon, label, value }) => {
  return (
    <div className="trip-general-info bg-background border-border border p-2 rounded-lg flex items-center">
      {Icon && <Icon className="w-4 h-4 mr-2" />}
      <span>
        {label}: {value}
      </span>
    </div>
  );
};

export default TripInfoLabel;
