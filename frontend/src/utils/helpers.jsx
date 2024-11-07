import star from "../assets/star_filled.png"

export const renderStars = (rating) => {
  return Array.from({ length: rating }, (_, index) => (
    <img key={index} src={star} alt="star" className="w-6 h-6" />
  ));
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);

  // Format the date as YYYY-MM-DD
  const formattedDate = `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  return formattedDate;
};

export const translateSentimentScore = (score) => {
  if (score >= 7) {
    return "Positive";
  } else if (score <= 3) {
    return "Negative";
  } else {
    return "Neutral";
  }
};
