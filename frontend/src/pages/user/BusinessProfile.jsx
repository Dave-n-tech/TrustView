import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { useContext } from "react";
import { FullReviewCard } from "../../components/user/FullReviewCard";
import axios from "../../api/axios";
import Star from "../../assets/star_filled.png";

export const BusinessProfile = () => {
  const { authData } = useContext(AuthContext);
  const [company, setCompany] = useState({});
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { id, name } = useParams();

  const defaultLogoUrl =
    "https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8=";

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const usersResponse = await axios.get(`/users`);
        setUsers(usersResponse.data);

        const companyResponse = await axios.get(`/companies/${id}`);
        setCompany(companyResponse.data);

        const reviewsResponse = await axios.get(`/reviews/company/${id}`);
        setReviews(reviewsResponse.data);


        // Calculate average rating
        const totalRating = reviewsResponse.data.reduce(
          (acc, review) => acc + review.rating,
          0
        );
        const avgRating =
          reviewsResponse.data.length > 0
            ? (totalRating / reviewsResponse.data.length).toFixed(1)
            : 0;
        setAverageRating(avgRating);
      } catch (error) {
        console.error("Failed to fetch company data:", error);
      }
    };

    fetchCompanyData();
  }, [id]);

  if (!company) return <div>Loading...</div>;

  const handleReviewRedirect = () => {
    if (authData) {
      navigate(`/submit-review/${company.id}`); // Redirect to submit-review if logged in
    } else {
      navigate("/login"); // Redirect to login if not logged in
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Company Information Section */}
      <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-6 md:flex-row md:items-start md:space-x-6">
        <img
          src={company.logoUrl || defaultLogoUrl}
          alt={`${company.name} logo`}
          className="w-24 h-24 rounded-full object-cover mb-4 md:mb-0"
        />
        <div>
          <h1 className="text-3xl font-semibold mb-2">{company.name}</h1>
          <p className="text-sm text-gray-600 mb-4">{company.category}</p>
          <p className="text-gray-700 mb-4">
            {company.bio || "No bio available"}
          </p>
          <div className="flex items-center">
            <span className="text-yellow-500 font-semibold mr-1">
              Average Rating: {averageRating}
            </span>
            <img src={Star} alt="star icon" className="w-5 h-5" />
            <span className="text-gray-500 ml-2">
              ({reviews.length} reviews)
            </span>
          </div>
        </div>
      </div>

      {/* Write Review Button */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleReviewRedirect}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Write a Review
        </button>
      </div>

      {/* Reviews Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        <div className="space-y-8">
          {reviews.map((review) => {
            const filteredUsers = users.filter((user) => user.id === review.userId);
            const user = filteredUsers[0]

            return (
              <FullReviewCard
                key={review.id}
                company={company}
                user={user}
                review={review}
              />
            );
          })}
          {reviews.length === 0 && (
            <p className="text-gray-500">No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};
