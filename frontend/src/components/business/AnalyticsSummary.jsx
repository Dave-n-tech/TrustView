import Star from "../../assets/star_filled.png";

export const AnalyticsSummary = ({ analytics }) => {
  const sentimentColor = (score) => {
    if (score >= 7 && score <= 10) {
      return "text-green-600";
    } else if (score <= 3) {
      return "text-red-600";
    } else {
      return "text-yellow-500";
    }
  };

  const sentiment = (score) => {
    if (score >= 7 && score <= 10) {
      return "Positive";
    } else if (score <= 3) {
      return "Negative";
    } else {
      return "Neutral";
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full md:w-2/3 mx-auto my-8">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Analytics Summary
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {/* Total Reviews */}
        <div className="p-4 bg-white rounded-md shadow-sm">
          <p className="text-lg font-semibold">Total Reviews</p>
          <p className="text-2xl text-blue-600">{analytics.totalReviews}</p>
        </div>

        {/* Average Rating */}
        <div className="p-4 bg-white rounded-md shadow-sm">
          <p className="text-lg font-semibold">Average Rating</p>
          <p className="flex items-center justify-center text-2xl text-blue-600">
            {analytics.averageRating}
            <img src={Star} alt="star" className="w-5 h-5 ml-1" />
          </p>
        </div>

        {/* Sentiment Distribution */}
        <div className="p-4 bg-white rounded-md shadow-sm">
          <p className="text-lg font-semibold">Avg Sentiment</p>
          <div className="text-sm mt-2">
            <p>
              <span className={`${sentimentColor(analytics.averageSentiment)}`}>
                {sentiment(analytics.averageSentiment)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
