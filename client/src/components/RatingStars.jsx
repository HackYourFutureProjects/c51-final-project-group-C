function RatingStars({ rating, onRate }) {
  const totalStars = 5;

  return (
    <span
      className="rating-stars text-accent"
      aria-label={`Rating: ${rating} out of 5`}
    >
      {Array.from({ length: totalStars }).map((_, i) => (
        <span
          key={i}
          onClick={() => onRate && onRate(i + 1)}
          className={`cursor-pointer text-2xl ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
        >
          ★
        </span>
      ))}
    </span>
  );
}

export default RatingStars;
