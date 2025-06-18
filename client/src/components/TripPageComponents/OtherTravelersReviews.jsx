/* eslint-disable no-unused-vars */
import ReviewCard from "../ReviewCard";
import { mockTripData } from "../../assets/dummyData/mockTripData";

const OtherTravelersReviews = () => {
  // Mock data for other travelers reviews
  const mockReviewsFromOtherTravelers = mockTripData.reviews;

  return (
    <section className="other-travelers-reviews-section mt-16 mb-16">
      <h4 className="other-travelers-reviews-section-title text-2xl font-semibold mb-8">
        Other Travelers Reviews
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockReviewsFromOtherTravelers.map((review) => (
          <ReviewCard key={review._id} user={review.user} text={review.text} />
        ))}
      </div>
    </section>
  );
};

export default OtherTravelersReviews;
