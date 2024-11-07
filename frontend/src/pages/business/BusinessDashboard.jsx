import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "../../api/axios";
import { useParams } from "react-router-dom";
import { SidebarMenu } from "../../components/business/sideBarMenu";
import { AuthContext } from "../../context/AuthProvider";
import { useContext } from "react";

export const BusinessDashboard = () => {
  const { error } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    // console.log(authData);
    fetchReviews();
  }, []);
  
  const fetchReviews = async () => {
    try {
      const response = await axios.get(`/reviews/company/${id}/all`);
      const reviewData = response.data;
      setReviews(reviewData);
      // setFilteredReviews(reviewData);
    } catch (error) {
      console.error("Error fetching reviews:", error);
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


  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);


  return (
    <div className="flex min-h-screen">
      <div className="hidden md:block">
        <SidebarMenu />
      </div>

      <button
        onClick={toggleSidebar}
        className="md:hidden bg-PrimaryBlue text-white p-2 fixed top-4 left-4 z-20 rounded-md shadow-lg"
      >
        {isSidebarOpen ? "Close" : "Menu"}
      </button>

      
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleSidebar}
        ></div>
      )}

      
      <div
        className={`fixed inset-y-0 left-0 bg-white w-64 p-6 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-200 ease-in-out z-20 md:relative md:translate-x-0`}
      >
        <SidebarMenu />
      </div>

      {/* Main Content */}
      <div className="w-full md:ml-8 container mx-auto p-6">
        {error && <p className="text-red-500 bg-red-200 text-center p-3">Error: {error}</p>}
        <Outlet context={reviews} />
      </div>
    </div>
  );
};
