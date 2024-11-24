import Star from "../../assets/star_filled.png";
import { formatDate, translateSentimentScore } from "../../utils/helpers";
import axios from "../../api/axios";
import { AuthContext } from "../../context/AuthProvider";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const DashboardReviewCard = ({ review, user }) => {
  const { token } = useContext(AuthContext);
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const renderStars = (rating) => {
    return Array.from({ length: rating }, (_, index) => (
      <img key={index} src={Star} alt="star" className="w-4 h-4" />
    ));
  };

  const verifyReview = async (review) => {
    try {
      const response = await axios.patch(
        `/reviews/user/${review.id}`,
        { tag: "verified" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("review verified successfully")
      navigate(0)
      console.log(response.data.message)
    } catch (error) {
      console.error('Error verifying review: ', error)
      setError(`Error verifying review, please try again`)
    }
  };

  return (
    <div
      key={review.id}
      className="border border-blue-200 rounded-md p-4 bg-white hover:shadow-xl"
    >
      <p>from: {user?.username || review.customerName}</p>
      <p className="text-sm text-gray-500">{formatDate(review.createdAt)}</p>
      <p className="text-md font-semibold">
        Rating:
        <span className="inline-flex flex-row">
          {renderStars(review.rating)}
        </span>
      </p>

      <div className="flex items-center justify-between">
        <p className="text-sm">
          Sentiment:{" "}
          <span>{translateSentimentScore(review.sentimentScore)}</span>
        </p>
        <p className="text-sm">
          Verified:
          <span
            className={`${
              review.tag === "verified" ? "text-green-600" : "text-red-600"
            }`}
          >
            {review.tag === "verified" ? " Yes" : " No"}
          </span>
        </p>
      </div>
      <h3 className="text-lg font-bold mt-4 mb-2">{review.title}</h3>
      <p className="mb-4 text-md">"{review.content}"</p>
      {error && <p className="bg-red-200 text-red-400">{error}</p>}
      {review.tag !== "verified" && (
        <button
          onClick={() => verifyReview(review)}
          className="mt-3 px-3 py-1 bg-green-500 text-white rounded-md"
        >
          Verify Review
        </button>
      )}
    </div>
  );
};
