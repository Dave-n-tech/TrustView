import { useEffect, useState } from "react";
import { ReviewCard } from "./ReviewCard";
import { CompanySelector } from "./CompanySelector";

export const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;
  const url = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    const fetchReviewAndCompany = async () => {
      try {
        const [reviewResponse, companyResponse, userResponse] =
          await Promise.all([
            fetch(`${url}/reviews`),
            fetch(`${url}/companies`),
            fetch(`${url}/users`),
          ]);

        const reviews = await reviewResponse.json();
        const companies = await companyResponse.json();
        const users = await userResponse.json();

        const companyMap = {};
        companies.forEach((company) => {
          companyMap[company.id] = company.name;
        });

        const userMap = {};
        users.forEach((user) => {
          userMap[user.id] = user.username;
        });

        const reviewsWithCompanyNames = reviews.map((review) => {
          return {
            ...review,
            companyName: companyMap[review.companyId],
            user: userMap[review.userId],
          };
        });
        setReviews(reviewsWithCompanyNames);
      } catch (error) {
        setErrMsg("Error fetching reviews");
        console.error(error);
      }
    };

    fetchReviewAndCompany();
  }, []);

  const totalPages = Math.ceil(reviews.length / pageSize);

  const paginatedReviews = reviews.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <section id="reviews" className="container mx-auto mb-12">
      <h1 className="text-PrimaryBlue font-bold text-3xl text-center mb-5">View Reviews</h1>
      <CompanySelector />
      <h1 className="text-PrimaryBlue font-bold text-3xl text-center mb-1">
        Recent
      </h1>
      {errMsg && (
        <p className="text-center bg-red-200 text-red-600 p-3">
          Error: {errMsg}
        </p>
      )}
      <div className="container p-5 flex flex-row items-start justify-center md:justify-start gap-5 flex-wrap">
        {paginatedReviews.map((review) => {
          return (
            <ReviewCard
              key={review.id}
              id={review.id}
              user={review.user}
              company={review.companyName}
              stars={review.rating}
              content={review.content}
              tag={review.tag}
            />
          );
        })}
      {reviews.length === 0 && <p className="text-center mx-auto"> No recent reviews</p>}
      </div>
      <div className="container flex items-center justify-center mx-5 space-x-3">
        <button
          className="bg-PrimaryBlue text-white px-5 py-2 hover:bg-blue-900 disabled:opacity-50"
          onClick={() => {
            setCurrentPage(currentPage - 1);
          }}
          disabled={currentPage === 1}
        >
          prev
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`px-4 py-2 mx-1 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            } hover:bg-blue-400`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="bg-PrimaryBlue text-white px-5 py-2 hover:bg-blue-900 disabled:opacity-50"
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
          disabled={currentPage === totalPages}
        >
          next
        </button>
      </div>
    </section>
  );
};
