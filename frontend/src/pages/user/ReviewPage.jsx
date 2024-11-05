import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useParams } from "react-router-dom";
import { FullReviewCard } from "../../components/user/FullReviewCard";

export const ReviewPage = () => {
  const { id } = useParams();
  const [review, setReview] = useState({});
  const [company, setCompany] = useState({});
  const [user, setUser] = useState({});
  // get review from api
  // get customer name from id
  // render card to display review
  // username links to user profile
  // company name links to company profile

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get(`/reviews/user/${id}`);
        const review = response.data;
        setReview(review);
        console.log(review);

        const companyResponse = await axios.get(
          `/companies/${review.companyId}`
        );
        const company = companyResponse.data;
        setCompany(company);
        console.log(company);

        const userResponse = await axios.get(`/users/${review.userId}`);
        const user = userResponse.data;
        setUser(user);
        console.log(user);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchReview();
  }, [id]);


  return (
    <div className="container mx-auto mt-12 p-4 mb-8 h-screen">
      <FullReviewCard review={review} user={user} company={company} />
    </div>
  );
};
