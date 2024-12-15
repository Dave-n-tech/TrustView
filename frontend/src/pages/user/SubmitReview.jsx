import React, { useEffect, useState } from "react";
import { CompanyContext } from "../../context/CompanyProvider";
import { AuthContext } from "../../context/AuthProvider";
import { useContext } from "react";
import axios from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";


export const SubmitReview = () => {
  const { authData, token } = useContext(AuthContext);
  const { companies, loading } = useContext(CompanyContext);
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [errMsg, setErrMsg] = useState("")
  const {companyId} = useParams()
  const [loadingState, setLoadingState] = useState(false)
  // const navigate = useNavigate()

  useEffect(() => {
    if(companyId){
      setSelectedCompanyId(companyId)
    }

    // navigateOnMount()
  },[companyId])

  // const navigateOnMount = () => {
  //   console.log(token)

  //   if(token === null){
  //     navigate("/login")
  //   }
  // }

  const handleSelectCompany = (e) => {
    setSelectedCompanyId(e.target.value);
    console.log(e.target.value);
  };

  const handleStarClick = (star) => {
    setRating(star);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingState(true)
    setErrMsg("")

    try {

      const sentimentResponse = await axios.post("/sentiment", { review: content });
      const score = await sentimentResponse.data.score

      const reviewObject = {
        companyId: selectedCompanyId,
        userId: authData.id,
        title: title,
        content: content,
        rating: rating,
        tag: "unverified",
        sentimentScore: score
      };
      console.log(reviewObject);
  
       // Submit review data to the backend
       const response = await axios.post("/reviews/user", reviewObject, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
       if (response.status === 201) {
         alert("Review submitted successfully!");
         // Reset form fields
         setTitle("");
         setContent("");
         setRating(0);
         setSelectedCompanyId("")
       }
      
    } catch (error) {
      setErrMsg("Error submitting review")
      console.error("Error submitting review:", error);
    }finally{
      setLoadingState(false)
    }

  };

  return (
    <div className="container p-3 mx-auto mt-4 h-screen">
      <h1 className="text-2xl font-bold text-center text-PrimaryBlue">
        SUBMIT REVIEW
      </h1>
      {errMsg && <p className="bg-red-300 text-red-500 p-4 text-center">{errMsg}</p>}

      {loading ? (
        <p className="container bg-blue-100 py-3 px-5">loading companies</p>
      ) : (
        <div className="companies">
          <select
            className="container border border-PrimaryBlue py-3 px-5 my-4 rounded-sm"
            name="companies"
            value={selectedCompanyId}
            onChange={handleSelectCompany}
          >
            <option value="" disabled>
              Select a company to review
            </option>
            {companies.map((company) => {
              return (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              );
            })}
          </select>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold text-2xl mb-2">Rating:</label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                className={`text-3xl ${
                  star <= rating ? "text-blue-500" : "text-gray-300"
                }`}
                onClick={() => handleStarClick(star)}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-semibold text-2xl mb-2" htmlFor="title">
            Title:
          </label>
          <input
            id="title"
            type="text"
            className="w-full p-2 border border-PrimaryBlue rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block font-semibold text-2xl mb-2"
            htmlFor="content"
          >
            Review:
          </label>
          <textarea
            id="content"
            className="w-full p-2 border border-PrimaryBlue rounded"
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {loadingState ? "Submitting..." :"Submit Review"}
        </button>
      </form>
    </div>
  );
};
