import React, { useContext, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "../../api/axios";
import { AuthContext } from "../../context/AuthProvider";

export const CustomerReview = () => {
  const location = useLocation();
  //   const { token } = useContext(AuthContext);
  const [reviewToken, setReviewToken] = useState(null);
  const [formData, setFormData] = useState({
    companyId: "",
    customerName: "",
    customerEmail: "",
    title: "",
    content: "",
    rating: "",
    tag: reviewToken ? "verified" : "unverified",
  });
  const { companyId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Extract the token from the URL query parameters
    const queryParams = new URLSearchParams(location.search);
    const tokenFromURL = queryParams.get("token");
    setReviewToken(tokenFromURL);

    //set companyId
    setFormData({ ...formData, companyId: companyId });
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStarClick = (star) => {
    setFormData((prevData) => ({
      ...prevData,
      rating: star,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const sentimentResponse = await axios.post("/sentiment", {
        review: formData.content,
      });
      const score = await sentimentResponse.data.score;
      const reviewObject = {...formData, sentimentScore: score}

      console.log(reviewObject);

        const response = await axios.post("/reviews/customer", reviewObject, {
          headers: {
            Authorization: `Bearer ${reviewToken}`,
          },
        });
        if (response.status === 201) {
          alert("Review submitted successfully!");
          // Reset form fields
          setFormData({
            companyId: "",
            customerName: "",
            customerEmail: "",
            title: "",
            content: "",
            rating: "",
            tag: reviewToken ? "verified" : "unverified",
          });
        }
    } catch (error) {
      console.error("Error submitting review:", error);
      setError("Error submitting review, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-3 px-32 mx-auto mt-4 min-h-screen">
      <h1 className="text-2xl font-bold text-center text-PrimaryBlue">
        SUBMIT REVIEW
      </h1>
      <form onSubmit={onSubmit}>
        {error && (
          <p className="bg-red-300 text-red-500 p-4 text-center">{error}</p>
        )}
        {/* Customer Name */}
        <div className="mb-4">
          <label className="block font-semibold text-2xl mb-2" htmlFor="name">
            Name:
          </label>
          <input
            id="name"
            type="text"
            name="customerName"
            className="w-full p-2 border border-PrimaryBlue rounded"
            value={formData.customerName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Customer Email */}
        <div className="mb-4">
          <label className="block font-semibold text-2xl mb-2" htmlFor="email">
            Email:
          </label>
          <input
            id="email"
            type="email"
            name="customerEmail"
            className="w-full p-2 border border-PrimaryBlue rounded"
            value={formData.customerEmail}
            onChange={handleChange}
            required
          />
        </div>

        {/* Rating */}
        <div className="mb-4">
          <label className="block font-semibold text-2xl mb-2">Rating:</label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                className={`text-3xl ${
                  star <= formData.rating ? "text-blue-500" : "text-gray-300"
                }`}
                onClick={() => handleStarClick(star)}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        {/* Review Title */}
        <div className="mb-4">
          <label className="block font-semibold text-2xl mb-2" htmlFor="title">
            Title:
          </label>
          <input
            id="title"
            type="text"
            name="title"
            className="w-full p-2 border border-PrimaryBlue rounded"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Review Content */}
        <div className="mb-4">
          <label
            className="block font-semibold text-2xl mb-2"
            htmlFor="content"
          >
            Review:
          </label>
          <textarea
            id="content"
            name="content"
            className="w-full p-2 border border-PrimaryBlue rounded"
            rows="5"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};
