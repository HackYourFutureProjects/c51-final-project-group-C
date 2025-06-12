import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function RatingStars({ rating, onRate }) {
  const totalStars = 5;

  return (
    <span className="flex gap-1" aria-label={`Rating: ${rating} out of 5`}>
      {Array.from({ length: totalStars }).map((_, i) => {
        const full = i + 1 <= Math.floor(rating);
        const half =
          i + 1 === Math.ceil(rating) &&
          rating % 1 >= 0.25 &&
          rating % 1 < 0.75;

        let icon;
        if (full || (i + 1 === Math.ceil(rating) && rating % 1 >= 0.75)) {
          icon = <FaStar className="text-yellow-400" size={24} />;
        } else if (half) {
          icon = <FaStarHalfAlt className="text-yellow-400" size={24} />;
        } else {
          icon = <FaRegStar className="text-gray-300" size={24} />;
        }

        return (
          <span key={i} className="relative cursor-pointer w-6 h-6">
            {icon}
            <span
              role="button"
              tabIndex={0}
              className="absolute top-0 left-0 w-1/2 h-full"
              onClick={() => onRate && onRate(i + 0.5)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  onRate && onRate(i + 0.5);
                }
              }}
            />
            <span
              role="button"
              tabIndex={0}
              className="absolute top-0 right-0 w-1/2 h-full"
              onClick={() => onRate && onRate(i + 1)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  onRate && onRate(i + 1);
                }
              }}
            />
          </span>
        );
      })}
    </span>
  );
}

export default RatingStars;
