import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import { FullReviewCard } from "../../components/user/FullReviewCard";

export const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [userReviews, setUserReviews] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    // get user data
    //get all reviews by user
    const getUser = async () => {
      try {
        const res = await axios.get(`/users/${id}`);
        const user = res.data;
        setUser(user);
        console.log(user);
      } catch (error) {
        setErrMsg("Error getting user data");
        console.error("An error occured: ", error);
      }
    };

    const getUserReviews = async () => {
      try {
        const res = await axios.get(`/reviews/users/${id}`);
        const reviews = res.data;
        setUserReviews(reviews);
      } catch (error) {
        setErrMsg("Error getting user reviews");
        console.error("An error occured: ", error);
      }
    };

    const getAllCompanies = async () => {
      try {
        const res = await axios.get(`/companies`);
        const companies = res.data;
        setCompanies(companies);
      } catch (error) {
        console.error("An error occured: ", error);
      }
    };

    getUser();
    getAllCompanies();
    getUserReviews();
  }, [id]);

  return (
    <div className="container min-h-screen mx-auto mt-4 mb-20">
      <div className="w-full py-8 px-12 bg-gray-400 flex space-x-4 items-center mb-4">
        <img
          src="https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8="
          alt="profile-img"
          className="w-20 h-20 rounded-full"
        />
        <h3 className="font-bold text-3xl">{user.username}</h3>
      </div>

      {/* Reviews */}
      <div className="px-10 md:px-16">
        <h1 className="text-2xl font-bold my-2">Reviews</h1>
        <hr />
        <div className="flex flex-col space-y-8 my-6">
          {userReviews.map((review) => {
            const company = companies.filter(
              (company) => company.id === review.companyId
            );
            console.log(company[0]);
            return (
              <FullReviewCard
                key={review.id}
                company={company[0]}
                user={user}
                review={review}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
