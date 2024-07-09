import React from "react";
import signupImage from "../assets/images/signup.gif";
import profile from "../assets/images/avatar-icon.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import uploadImage from "../utils/uploadCloudinary";
import { BASE_URL } from "../config";
import { toast } from "react-hot-toast";
import HashLoader from "react-spinners/HashLoader";
import { errorToast, successToast } from "../utils/toastSetting";
import axios from "axios";

const Signup = () => {
  // Navigation
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    role: "patient",
    photo: selectedFile,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Profile Update
  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const uploasURL = await uploadImage(file);
    setPreviewURL(uploasURL.url);
    setSelectedFile(uploasURL.url);
    setFormData({ ...formData, photo: uploasURL.url });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, formData);
      successToast(response.data.message);
      setLoading(false);

      navigate("/login");
    } catch (error) {
      setLoading(false);
      errorToast(error.response.data.error);
    }
  };
  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className=" grid grid-cols-1 lg:grid-cols-2">
          {/* ======= img bog ======== */}
          <div className="hidden lg:block bg-primaryColor rounded-l-lg">
            <figure className="rounded-l-lg">
              <img src={signupImage} alt="" className="w-full rounded-l-lg" />
            </figure>
          </div>

          {/* ======= sign up form ====== */}

          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              Create an <span className="text-primaryColor">account</span>
            </h3>

            <form onSubmit={submitHandler}>
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-textColor placeholder:text-textColor cursor-pointer"
                />
              </div>

              <div className="mt-4">
                <div></div>
                <div>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-textColor placeholder:text-textColor cursor-pointer"
                  />
                </div>
              </div>

              <div className="mt-4">
                <input
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-textColor placeholder:text-textColor cursor-pointer"
                />
              </div>

              <div className="mb-5 flex  items-center justify-between">
                <label className="text-headingColor font-bold text-[16px] leading-7">
                  Are you a:{" "}
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 outline-none"
                  >
                    <option value="patiemt">Patient</option>
                    <option value="doctor">Doctor</option>
                  </select>
                </label>

                <label className="text-headingColor font-bold text-[16px] leading-7">
                  Are you a:{" "}
                  <select
                    name="gender"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="text-headingColor font-semibold text-[15px] leading-7 px-4 py-3 outline-none"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </label>
              </div>

              <div className=" mb-5 flex items-center gap-3">
                {selectedFile && (
                  <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                    <img
                      className="w-full h-full rounded-full object-cover"
                      src={previewURL}
                      alt=""
                    />
                  </figure>
                )}
                <div className="relative w-[130px] h-[50px]">
                  <input
                    type="file"
                    name="photo"
                    id="customFile"
                    onChange={handleFileInputChange}
                    accept=".jpg, .png"
                    className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0"
                  />
                  <label
                    htmlFor="customFile"
                    className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
                  >
                    Upload Photo
                  </label>
                </div>
              </div>

              <div className="mt-7">
                <button
                  disabled={loading && true}
                  type="submit"
                  className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                >
                  {" "}
                  {loading ? (
                    <HashLoader size={25} color="#ffffff" />
                  ) : (
                    "Register"
                  )}
                </button>
              </div>
              <p className="mt-5 text-textColor text-center">
                Alredy have an account?{" "}
                <Link
                  to={"/login"}
                  className="text-primaryColor font-medium ml-2"
                >
                  {" "}
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
