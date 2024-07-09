import react, { useContext } from "react";
import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { BASE_URL } from "../../config";
import { authContext } from "../../context/authContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import { errorToast, successToast } from "../../utils/toastSetting";
import HashLoader from "react-spinners/HashLoader";

const DoctorFeedbackForm = () => {
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useContext(authContext);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const reviewObj = {
        reviewText,
        rating,
      };
      console.log("&&&&&&&&&&&", reviewObj);
      const response = await axios.post(
        `${BASE_URL}/doctor/${id}/review/create`,
        reviewObj,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      successToast(response.data.message);
      setLoading(false);
    } catch (error) {
      console.log("REVIEW SENDING ERROR-----", error);
      setLoading(false);
      errorToast(error.response.data.error);
    }
  };

  return (
    <form>
      <div>
        <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4">
          How would you rate overall experience?*
        </h3>
        <div>
          {[...Array(5).keys()].map((_, index) => {
            // index
            return (
              <button
                key={index}
                type="button"
                className={`${
                  index < ((rating && hover) || hover)
                    ? "text-yellowColor"
                    : "text-gray-400"
                } bg-transparent border-none outline-none text-[22px] cursor-pointer`}
                onClick={() => setRating(index + 1)}
                onMouseEnter={() => setHover(index + 1)}
                onMouseLeave={() => setHover(rating)}
                onDoubleClick={() => {
                  setHover(0);
                  setRating(0);
                }}
              >
                <span>
                  {" "}
                  <AiFillStar />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-[30px]">
        <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0">
          Share your feedback or suggestions*
        </h3>

        <textarea
          className="border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md"
          rows={5}
          placeholder="White your message"
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>
      </div>
      <button onClick={handleSubmitReview} className="btn" type="submit">
       {loading ? <HashLoader size={24} color="#fff"/> : `Submit Feedback`}
      </button>
    </form>
  );
};

export default DoctorFeedbackForm;
