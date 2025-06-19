function Cards({ trips }) {
  return (
    <div className="cards-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-9 m-20 mt-2">
      {trips.map((trip) => (
        <div
          key={trip.ID}
          className="card w-68 p-4 rounded-xl border border-border transform transition-all hover:-translate-y-2 duration-300 shadow-xl hover:shadow-2xl"
        >
          <img
            className="card-image h-40 object-cover rounded-xl mx-auto"
            src={trip.coverPhotoUrl}
            alt={`${trip.title} cover`}
          />

          <header className="mt-2 mb-3">
            <h2 className="card-title font-bold text-text text-lg">
              {trip.title}
            </h2>
            <p className="text-sm text-muted">{trip.duration} days</p>
          </header>

          <div className="card-details mb-3 text-sm text-text">
            <p>Created by: {trip.userId}</p>
            <p>
              Rating: {trip.creatorRating}/5{" "}
              {/* You could render stars here if you want */}
              {/* <RatingStars rating={trip.creatorRating} /> */}
            </p>
          </div>

          <footer className="text-xs text-muted">
            <p>
              Copied by {trip.timesCopied} traveler
              {trip.timesCopied !== 1 ? "s" : ""}
            </p>
          </footer>
        </div>
      ))}
    </div>
  );
}

export default Cards;
