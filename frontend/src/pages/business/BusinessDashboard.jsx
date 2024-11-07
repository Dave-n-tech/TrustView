import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { CSVLink } from "react-csv";
import { useParams } from "react-router-dom";
import { AnalyticsSummary } from "../../components/business/AnalyticsSummary";
import { DashboardReviewCard } from "../../components/business/DashboardReviewCard";
import { FilterButton } from "../../components/business/FilterButton";
import { SidebarMenu } from "../../components/business/sideBarMenu";


export const BusinessDashboard = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalReviews: 0,
    averageRating: 0,
    averageSentiment: 0
  });
  const [filterStatus, setFilterStatus] = useState("all");
  const { id } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // console.log(authData);
    fetchReviews();
  }, []);
  
  const fetchReviews = async () => {
    try {
      const response = await axios.get(`/reviews/company/${id}/all`);
      const reviewData = response.data;
      setReviews(reviewData);
      calculateAnalytics(reviewData);
      setFilteredReviews(reviewData);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };
  const calculateAnalytics = (reviewData) => {
    const totalReviews = reviewData.length;
    const averageRating =
      reviewData.reduce((sum, review) => sum + review.rating, 0) / totalReviews;

    const averageSentiment = reviewData.reduce((sum, review) => sum + parseInt(review.sentimentScore), 0) / totalReviews;

    setAnalytics({
      totalReviews,
      averageRating: averageRating.toFixed(1),
      averageSentiment: averageSentiment.toFixed(0),
    });
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    
    switch (status) {
      case "all":
        setFilteredReviews(reviews);
        break;
  
      case "verified":
        setFilteredReviews(reviews.filter((review) => review.tag === "verified"));
        break;
  
      case "unverified":
        setFilteredReviews(reviews.filter((review) => review.tag !== "verified"));
        break;
  
      case "rating":
        setFilteredReviews([...reviews].sort((a, b) => b.rating - a.rating));
        break;
  
      case "date":
        setFilteredReviews([...reviews].sort((a, b) => new Date(b.date) - new Date(a.date)));
        break;
  
      default:
        setFilteredReviews(reviews);
        break;
    }
  };

  // const verifyReview = (reviewId) => {
  //   // urgent fix!!!
  //   // update review tag in database
  //   setReviews((prevReviews) =>
  //     prevReviews.map((review) =>
  //       review.id === reviewId ? { ...review, tag: "verified" } : review
  //     )
  //   );
  //   setFilteredReviews((prevReviews) =>
  //     prevReviews.map((review) =>
  //       review.id === reviewId ? { ...review, tag: "verified" } : review
  //     )
  //   );
  // };

  const exportReviewsAsCSV = () => {
    const csvData = reviews.map((review) => ({
      Date: review.date,
      Rating: review.rating,
      Sentiment: review.sentiment,
      Verified: review.verified ? "Yes" : "No",
      Content: review.content,
    }));
    return csvData;
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);


  return (
    <div className="flex min-h-screen">
      {/* Sidebar for larger screens */}
      <div className="hidden md:block">
        <SidebarMenu />
      </div>

      {/* Sidebar Toggle Button for mobile */}
      <button
        onClick={toggleSidebar}
        className="md:hidden bg-PrimaryBlue text-white p-2 fixed top-4 left-4 z-20 rounded-md shadow-lg"
      >
        {isSidebarOpen ? "Close Menu" : "Open Menu"}
      </button>

      {/* Sidebar overlay on mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar menu sliding in on mobile */}
      <div
        className={`fixed inset-y-0 left-0 bg-white w-64 p-6 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-200 ease-in-out z-20 md:relative md:translate-x-0`}
      >
        <SidebarMenu />
      </div>

      {/* Main Content */}
      <div className="w-full md:ml-8 container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-4">Dashboard</h1>

        {/* Filter Reviews */}
        <div className="flex flex-col md:flex-row justify-between items-center my-4">
          <div className="flex flex-row flex-wrap items-center justify-center space-y-2 space-x-4">
            <FilterButton handleChange={() => handleFilterChange("all")} filterBy={"all"} filterStatus={filterStatus} />
            <FilterButton handleChange={() => handleFilterChange("verified")} filterBy={"verified"} filterStatus={filterStatus} />
            <FilterButton handleChange={() => handleFilterChange("unverified")} filterBy={"unverified"} filterStatus={filterStatus} />
            <FilterButton handleChange={() => handleFilterChange("rating")} filterBy={"rating"} filterStatus={filterStatus} />
            <FilterButton handleChange={() => handleFilterChange("date")} filterBy={"date"} filterStatus={filterStatus} />
          </div>
        </div>

        {/* Review Cards */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10">
          {filteredReviews.map((filteredReview) => (
            <DashboardReviewCard key={filteredReview.id} review={filteredReview} />
          ))}
        </div>

        {/* Export Button */}
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md my-10">
          <CSVLink data={exportReviewsAsCSV()} filename="reviews.csv">
            Export as CSV
          </CSVLink>
        </button>

        {/* Analytics Summary */}
        <AnalyticsSummary analytics={analytics} />

        {/* Profile Settings Link */}
        <div className="text-center my-8">
          <a
            href="/profile-settings"
            className="text-blue-500 underline hover:text-blue-700"
          >
            Manage Profile Settings
          </a>
        </div>
      </div>
    </div>
  );
};
