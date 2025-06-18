const TimelineConnector = ({ number, isLast = false }) => {
  return (
    <div className="timeline-connector-line absolute left-2 sm:left-4 top-0 bottom-0 mb-0 flex flex-col items-center">
      <div className="event-number-box w-10 h-10 sm:w-16 sm:h-16 rounded-lg border border-border text-text flex items-center justify-center font-medium z-10 shadow-sm">
        {number}
      </div>
      {!isLast && (
        <div className="connector-line border-l border-dashed border-border flex-grow"></div>
      )}
    </div>
  );
};

export default TimelineConnector;
