import React, { useEffect, useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import uploadImage from "../../utils/uploadCloudinary";
import { errorToast, successToast } from "../../utils/toastSetting";
import { BASE_URL } from "../../config";
import axios from "axios";
import { authContext } from "../../context/authContext";
// const { dispatch } = useContext(authContext);

const UserProfile = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user: userData, token, dispatch } = useContext(authContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    photo: selectedFile,
    bloodType: "",
  });

  useEffect(() => {
    setFormData({
      name: user.name,
      email: user.email,
      gender: user.gender,
      bloodType: user.bloodType,
      photo: user.photo,
      phone: user.phone,
    });
  }, [user]);

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
      // console.log("********** formData", formData);
      const response = await axios.put(
        `${BASE_URL}/user/${userData._id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      user = response.data.data;
      dispatch({
        type: "USER_UPDATE",
        payload: {
          user: response.data.data,
          token: token,
          role: response.data.data.role,
        },
      });
      // console.log("Response", response.data.data);
      successToast(response.data.message);
      setLoading(false);
      navigate("/user/profile");
    } catch (error) {
      setLoading(false);
      errorToast(error.response.data.error);
      console.log("USER PROFILE UPDATE ERROR", error.response.data.error);
    }
  };

  const CustomSelect = ({ name, value, onChange, options }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(value);

    const handleSelect = (option) => {
      setSelectedOption(option);
      onChange({ target: { name, value: option } });
      setIsOpen(false);
    };

    return (
      <div className="relative">
        <button
          type="button"
          className="form__input py-3.5 w-full text-left"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption
            ? options.find((opt) => opt.value === selectedOption).label
            : "Select"}
        </button>
        {isOpen && (
          <div className="absolute z-10 w-full bg-white shadow-lg border rounded mt-2 max-h-60 overflow-y-auto">
            {options.map((option) => (
              <div
                key={option.value}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-200 ${
                  selectedOption === option.value ? "bg-gray-200" : ""
                }`}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  return (
    <div className="mt-5">
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
            type="number"
            placeholder="Enter Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-textColor placeholder:text-textColor cursor-pointer no-spin"
          />
        </div>

        <div className="mb-5 flex  items-center justify-between">
          <label className="text-headingColor font-bold text-[16px] leading-7 mt-5">
            Blood Type:{" "}
            <CustomSelect
              name="bloodType"
              value={formData.bloodType}
              onChange={handleInputChange}
              options={[
                { value: "", label: "Select" },
                { value: "O+", label: "O+" },
                { value: "O-", label: "O-" },
                { value: "A+", label: "A+" },
                { value: "A-", label: "A-" },
                { value: "B+", label: "B+" },
                { value: "B-", label: "B-" },
                { value: "AB+", label: "AB+" },
                { value: "AB-", label: "AB-" },
              ]}
            />
          </label>

          <label className="text-headingColor font-bold text-[16px] leading-7 mt-5">
            Are you a:{" "}
            <CustomSelect
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              options={[
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
                { value: "Other", label: "Other" },
              ]}
            />
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
            {loading ? <HashLoader size={25} color="#ffffff" /> : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
