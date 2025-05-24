function RatingStars({ rating }) {
  const totalStars = 5;
  const filledStars = Math.round(rating);
  const emptyStars = totalStars - filledStars;

  return (
    <span
      className="rating-stars text-accent"
      aria-label={`Rating: ${rating} out of 5`}
    >
      {"★".repeat(filledStars)}
      {"☆".repeat(emptyStars)}
    </span>
  );
}

export default RatingStars;
