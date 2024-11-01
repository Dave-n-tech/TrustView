import star from "../../assets/star_filled.png";
import { Link } from "react-router-dom";

export const ReviewCard = ({ id, user, company, stars, content, tag }) => {
  const renderStars = (rating) => {
    return Array.from({ length: rating }, (_, index) => (
      <img key={index} src={star} alt="star" className="w-5 h-5" />
    ));
  };

  return (
    <>
      <Link to={`/reviews/user/${id}`}>
        <div className="w-72 flex flex-col px-4 py-3 space-y-2 bg-white border-blue-100 border-2 rounded-2xl hover:shadow-xl">
          <div className="flex space-x-2">
            {/* profile  img */}
            <div className="w-10 h-10 rounded-3xl bg-blue-400">
              <img src="" alt="" />
            </div>
            {/* stars */}
            <div className="h-10 flex justify-between items-center">
              {renderStars(stars)}
            </div>
          </div>

          <p className="text-sm">
            {user} reviewed {company}
          </p>
          <p>"{content}"</p>
          <hr />
          <span className="text-sm">{tag}</span>
        </div>
      </Link>
    </>
  );
};
