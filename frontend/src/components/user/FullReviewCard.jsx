import React from "react";
import star from "../../assets/star_filled.png"

export const FullReviewCard = ({company, user, review}) => {

    const renderStars = (rating) => {
        return Array.from({ length: rating }, (_, index) => (
          <img key={index} src={star} alt="star" className="w-6 h-6" />
        ));
      };
    
      const formatDate = (dateString) => {
        const date = new Date(dateString);
    
        // Format the date as YYYY-MM-DD
        const formattedDate = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
        return formattedDate;
      };
    
      const translateSentimentScore = (score) => {
        if (score >= 7) {
          return "Positive";
        } else if (score <= 3) {
          return "Negative";
        } else {
          return "Neutral";
        }
      };

  return (
    <div>
      <p className="mb-4">
        Review of
        <a
          href={`/company/${company.id}/${company.name}`}
          className="text-blue-600 underline hover:font-bold"
        >
          {` ${company.name}`}
        </a>
      </p>
      <div className="review p-4 border-blue-200 border shadow-lg bg-gray-100">
        <div className="flex items-center space-x-3 mb-4">
          <img
            src="https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8="
            alt="profile-img"
            className="w-10 h-10 rounded-full"
          />
          <h3>
            <a href={`/user/${user.id}`} className="font-bold hover:underline">
              {user.username}
            </a>
          </h3>
        </div>
        <hr />
        <div className="flex justify-between mt-4 mb-4">
          <div className="flex space-x-2">{renderStars(review.rating)}</div>
          <p>{formatDate(review.createdAt)}</p>
        </div>
        <div className="flex flex-col space-y-2 mb-4">
          <h1 className="text-xl font-bold">{review.title || "No title"}</h1>
          <p>"{review.content}"</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <span>Status: {review.tag}</span>
          <span>
            Sentiment: {translateSentimentScore(review.sentimentScore)}
          </span>
        </div>
      </div>
    </div>
  );
};
