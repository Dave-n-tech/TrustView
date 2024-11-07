import Star from "../../assets/star_filled.png";
import { formatDate, translateSentimentScore } from "../../utils/helpers";

export const DashboardReviewCard = ({ review }) => {
  const renderStars = (rating) => {
    return Array.from({ length: rating }, (_, index) => (
      <img key={index} src={Star} alt="star" className="w-4 h-4" />
    ))
  };

 const verifyReview = (reviewId) => [

 ]

  return (
    <div key={review.id} className="border border-blue-200 rounded-md p-4 bg-white hover:shadow-xl">
      <p className="text-sm text-gray-500">{formatDate(review.createdAt)}</p>
      <p className="text-md font-semibold">
        Rating:
        <span className="inline-flex flex-row">
          {renderStars(review.rating)}
        </span>
      </p>

      <div className="flex items-center justify-between">
        <p className="text-sm">
          Sentiment: <span>{translateSentimentScore(review.sentimentScore)}</span>
        </p>
        <p className="text-sm">
          Verified:
          <span
            className={`${
              review.tag === "verified" ? "text-green-600" : "text-red-600"
            }`}
          >
            {review.tag === "verified" ? "Yes" : "No"}
          </span>
        </p>
      </div>
      <p className="my-4 text-md">"{review.content}"</p>
      {review.tag !== "verified" && (
        <button
          onClick={() => verifyReview(review.id)}
          className="mt-3 px-3 py-1 bg-green-500 text-white rounded-md"
        >
          Verify Review
        </button>
      )}
    </div>
  );
};
