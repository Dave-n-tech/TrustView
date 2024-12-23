import { DashboardReviewCard } from "../../components/business/DashboardReviewCard";
import { FilterButton } from "../../components/business/FilterButton";
import { CSVLink } from "react-csv";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "../../api/axios";

export const DashboardReviewPage = () => {
  const reviews = useOutletContext();
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // setFilteredReviews(reviews);
    handleFilterChange("all");

    const getUsers = async () => {
      try {
        const res = await axios.get(`/users`);
        const users = res.data;
        setUsers(users);
      } catch (error) {
        setErrMsg("Error getting users");
        console.error("An error occured: ", error);
      }
    };

    getUsers();
  }, [reviews]);

  useEffect(() => {
    console.log(filteredReviews);
  }, [filteredReviews]);

  const clearReviewState = () => {
    setFilteredReviews([]);
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    clearReviewState();

    setTimeout(() => {
      switch (status) {
        case "all":
          setFilteredReviews(reviews);
          setIsActive(true);
          break;

        case "verified":
          const verifiedReviews = reviews.filter(
            (review) => review.tag === "verified"
          );
          setFilteredReviews(verifiedReviews);
          setIsActive(true);
          break;

        case "unverified":
          const unverifiedReviews = reviews.filter(
            (review) => review.tag === "unverified"
          );
          setFilteredReviews(unverifiedReviews);
          setIsActive(true);
          break;

        case "rating":
          const sortedByRating = [...reviews].sort(
            (a, b) => b.rating - a.rating
          );
          setFilteredReviews(sortedByRating);
          setIsActive(true);
          break;

        case "date":
          const sortedByDate = [...reviews].sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          setFilteredReviews(sortedByDate);
          setIsActive(true);
          break;

        case "customers":
          const customerReviews = reviews.filter((review) =>
            review.hasOwnProperty("customerEmail")
          );
          setFilteredReviews(customerReviews);
          setIsActive(true);
          break;

        default:
          setFilteredReviews([]);
          setIsActive(true);
          break;
      }
    }, 0);
  };

  const exportReviewsAsCSV = () => {
    const csvData = reviews.map((review) => ({
      Date: review.date,
      Rating: review.rating,
      Sentiment: review.sentiment,
      Verified: review.tag === "verified" ? "Yes" : "No",
      Content: review.content,
    }));
    return csvData;
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-4">Reviews</h1>

      {/* Filter Reviews */}
      <div className="flex flex-col md:flex-row justify-between items-center my-4">
        <div className="flex flex-row flex-wrap items-center justify-center space-y-2 space-x-4">
          <FilterButton
            handleChange={() => handleFilterChange("all")}
            filterBy={"all"}
            filterStatus={filterStatus}
            active={isActive}
          />
          <FilterButton
            handleChange={() => handleFilterChange("verified")}
            filterBy={"verified"}
            filterStatus={filterStatus}
            active={isActive}
          />
          <FilterButton
            handleChange={() => handleFilterChange("unverified")}
            filterBy={"unverified"}
            filterStatus={filterStatus}
            active={isActive}
          />
          <FilterButton
            handleChange={() => handleFilterChange("rating")}
            filterBy={"rating"}
            filterStatus={filterStatus}
            active={isActive}
          />
          <FilterButton
            handleChange={() => handleFilterChange("date")}
            filterBy={"date"}
            filterStatus={filterStatus}
            active={isActive}
          />
          <FilterButton
            handleChange={() => handleFilterChange("customers")}
            filterBy={"customers"}
            filterStatus={filterStatus}
            active={isActive}
          />
        </div>
      </div>

      {/* Review Cards */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10">
        {filteredReviews.length === 0 ? (
          <p className="text-left my-2"> No reviews </p>
        ) : (
          filteredReviews.map((filteredReview) => {
            // console.log(filteredReview);
            const user = users.find(
              (user) =>
                user.id === filteredReview.userId && user.hasOwnProperty("username")
            );

            return (
              <DashboardReviewCard
                key={filteredReview.id}
                review={filteredReview}
                user={user}
              />
            );
          })
        )}
      </div>

      {/* Export Button */}
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md my-10">
        <CSVLink data={exportReviewsAsCSV()} filename="reviews.csv">
          Export as CSV
        </CSVLink>
      </button>

      {/* Profile Settings Link */}
      <div className="text-center my-8">
        <a
          href="/profile-settings"
          className="text-blue-500 underline hover:text-blue-700"
        >
          Manage Profile Settings
        </a>
      </div>
    </>
  );
};
