const EventDetail = ({ label, icon: Icon, value }) => {
  return (
    <div className="event-detail flex items-center gap-2">
      <span className="border border-border bg-background px-2 py-1 rounded-lg text-xs">
        {label}
      </span>
      <span className="flex items-center gap-1 text-xs sm:text-sm">
        {Icon && <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />}
        {value}
      </span>
    </div>
  );
};

export default EventDetail;
