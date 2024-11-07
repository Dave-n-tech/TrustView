import { AnalyticsSummary } from "../../components/business/AnalyticsSummary"
import { useState } from "react";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export const DashboardAnalytics = () => {
    const reviews = useOutletContext()
    const [analytics, setAnalytics] = useState({
        totalReviews: 0,
        averageRating: 0,
        averageSentiment: 0
      });

      useEffect(() => {
        calculateAnalytics(reviews);
      },[])

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



  return (
    <div>
        <AnalyticsSummary analytics={analytics} />
    </div>
  )
}
