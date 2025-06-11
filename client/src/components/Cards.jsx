import RatingStars from "./RatingStars.jsx";

function Cards({ trips }) {
  return (
    <div className="cards-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-9 m-20 mt-2">
      {trips.map((trip) => {
        return (
          <div
            key={trip.ID}
            className="card w-68 p-2 rounded-xl border border-border transform transition-all hover:-translate-y-2 duration-300 shadow-xl hover:shadow-2xl"
          >
            <img
              className="card-image h-40 object-cover rounded-xl mx-auto"
              src={trip.image}
              alt="trip pic"
            />
            <header>
              <h2 className="card-title p-1 font-bold text-text">
                {trip.title}
              </h2>
              <h2 className="card-title p-1 font-bold text-text">
                {trip.duration}{" "}
              </h2>
            </header>
            <div className="card-details p-1">
              <p>
                Created by {trip.creatorName}{" "}
                <RatingStars rating={trip.creatorRating} />
              </p>
            </div>
            <footer>
              <p className="card-trip-copies ">
                Copied by {trip.numberOfCopies} traveler
                {trip.numberOfCopies > 1 && "s"}
              </p>
            </footer>
          </div>
        );
      })}
    </div>
  );
}

export default Cards;
