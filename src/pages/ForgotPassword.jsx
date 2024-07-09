import React, { useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import { errorToast, successToast } from "../utils/toastSetting";
import axios from "axios";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/user/forgot-password`,
        formData
      );
      successToast(response.data.message);
      setLoading(false);
      console.log(response.data.data.link);
      navigate(response.data.data.link);
    } catch (error) {
      setLoading(false);
      errorToast(error.response.data.error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold md-10">
          Forgot <span className="text-primaryColor">User</span> Password 🪸
        </h3>

        <form action="" onSubmit={handleSubmit} className="px-5 lg:px-0 mt-10">
          <div className="mb-5">
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
              required
            />
          </div>

          <div className="mt-7">
            <button
              type="submit"
              className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
            >
              {loading ? (
                <HashLoader size={25} color="#ffffff" />
              ) : (
                "Forgot Password"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
