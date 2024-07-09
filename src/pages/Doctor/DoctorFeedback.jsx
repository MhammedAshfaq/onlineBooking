import React from "react";
import logo from "../../assets/images/avatar-icon.png";
import { formateDate } from "../../utils/formateDate";
import { AiFillStar } from "react-icons/ai";
import { useState } from "react";
import DoctorFeedbackForm from "./DoctorFeedbackForm";

const DoctorFeedback = ({ reviews, totalRating }) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  return (
    <div>
      <div className="mb-[50px]">
        <h4 className="text-[20px] leading-[30px] font-bold text-headingColor mb-[30px] tracking-wide">
          All reviews ({totalRating})
        </h4>

        {typeof reviews == "undefined" || reviews.length === 0 ? (
          <span className="text-textColor font-semibold ">
            There are no reviews for this doctor yet!
          </span>
        ) : (
          reviews.map((review, index) => (
            <div className="flex justify-between gap-10 mb-[30px]">
              <div className="flex gap-3">
                <figure className="">
                  <img className="w-10 h-10 object-cover rounded-full" src={review.user?.photo} alt="" />
                </figure>

                <div>
                  <h5 className="text-[16px] leading-6 text-primaryColor font-bold">
                    {review?.user?.name}
                  </h5>
                  <p className="text-[14px] leading-6 text-textColor">
                    {" "}
                    {formateDate(review?.createdAt)}
                  </p>
                  <p className="text__para mt-3 font-medium text-[15px]">
                    {review?.reviewText}
                  </p>
                </div>
              </div>

              <div className="flex gap-1">
                {[...Array(review?.rating).keys()].map((_, index) => (
                  <AiFillStar key={index} color="#0067FF" />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
      {!showFeedbackForm && (
        <div className="text-center">
          <button className="btn" onClick={() => setShowFeedbackForm(true)}>
            Give Feedback
          </button>
        </div>
      )}

      {showFeedbackForm && <DoctorFeedbackForm />}
    </div>
  );
};

export default DoctorFeedback;