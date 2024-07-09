import { useContext, useState } from "react";
import { convertTime } from "../../utils/convertTime";
import { BASE_URL } from "../../config";
import { authContext } from "../../context/authContext";
import { successToast, errorToast } from "../../utils/toastSetting";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";

const SidePanel = ({ timeSloat, price, doctorId }) => {
  const [loading, setLoading] = useState(false);
  const { token } = useContext(authContext);
  const bookingHandler = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/booking/checkout-sesstion/${doctorId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("************ RES", res.data.data.url);
      // Redirect to stipe website
      if (res.data && res.data.data && res.data.data.url) {
        // Redirect to Stripe website
        window.location.href = res.data.data.url;
      } else {
        errorToast("Stripe checkout session url not found");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // errorToast(error.response.data.error);
      console.log("BOOKING ERROR", error);
    }
  };
  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text__para mt-0 font-semibold ">Token Price</p>
        <span className="text-[16px] leading-7 lg:text-[20px] lg:leading-8 text-green-400 font-bold underline underline-offset-0">
          {typeof price == "undefined" ? (
            <span
              to={"/doctor/profile"}
              className="text-gray-500 text-[15px] underline"
            >
              Price not added!
            </span>
          ) : (
            `${price} INR`
          )}
        </span>
      </div>

      <div className="mt-[30px]">
        <p className="text__para mt-0 font-semibold text-headingColor text-[16px]">
          Aavailable Time Slots
        </p>

        <ul className="mt-3">
          {typeof timeSloat == "undefined" || timeSloat.length === 0 ? (
            <span className="text-textColor text-[15px] font-semibold">
              Time sloats not added!
            </span>
          ) : (
            timeSloat.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between mb-2"
              >
                <p className="text-[15px] leading-6 text-textColor font-semibold">
                  {item.day}
                </p>
                <p className="text-[15px] leading-6 text-textColor font-semibold">
                  {convertTime(item.startingTime)} -{" "}
                  {convertTime(item.endingTime)}
                </p>
              </li>
            ))
          )}
        </ul>
      </div>
      <button onClick={bookingHandler} className="btn px-2 w-full rounded-md">
        {loading ? (
          <HashLoader size={25} color="#ffffff" />
        ) : (
          "Book Appointment"
        )}
      </button>
    </div>
  );
};

export default SidePanel;
