import React, { useState, useContext, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import uploadImage from "../../utils/uploadCloudinary";
import { authContext } from "../../context/authContext";
import { BASE_URL } from "../../config";
import axios from "axios";
import { errorToast, successToast } from "../../utils/toastSetting";

const Profile = ({ doctorData }) => {
  // Use Effect
  useEffect(() => {
    setFormData({
      name: doctorData?.name,
      email: doctorData?.email,
      password: doctorData?.password,
      phone: doctorData?.phone,
      bio: doctorData?.bio,
      gender: doctorData?.gender,
      specialization: doctorData?.specialization,
      ticketPrice: doctorData?.ticketPrice,
      qualifications: doctorData?.qualifications,
      experiences: doctorData?.experiences,
      timeSlots: doctorData?.timeSlots,
      about: doctorData?.about,
      photo: doctorData?.photo,
    });
  }, [doctorData]);

  // console.log("^^^^^^^^^", doctorData);
  const { token, user: doctor, dispatch } = useContext(authContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    bio: "",
    gender: "",
    specialization: "",
    ticketPrice: null,
    qualifications: [],
    experiences: [],
    timeSlots: [],
    about: "",
    photo: null,
  });

  const [loading, setLoading] = useState(false);
  // const [selectedFile, setSelectedFile] = useState(null);
  // const [previewURL, setPreviewURL] = useState("");

  //Input Handle Change Function
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Doctor Profile Photo Update Function
  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const uploasURL = await uploadImage(file);
    // setPreviewURL(uploasURL.url);
    // setSelectedFile(uploasURL.url);
    setFormData({ ...formData, photo: uploasURL?.url });
  };

  // Submit Profile Update Function
  const updateDoctorProfile = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log(formData);
    try {
      const response = await axios.put(
        `${BASE_URL}/doctor/${doctorData._id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("RESPONSE", response.data);

      dispatch({
        type: "USER_UPDATE",
        payload: {
          user: response.data.data,
          token: token,
          role: response.data.data.role,
        },
      });
      successToast(response.data.message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      errorToast(error.response.data.error);
      console.log("DOCTOR PROFILE UPDATE ERROR", error.response.data.error);
    }
  };

  //Deleting Reusable Function
  const deleteItem = (key, index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: prevFormData[key].filter((_, i) => i !== index),
    }));
  };

  // Add (qualification, experience and time sloat) colums
  const addItem = (key, item) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: [...prevFormData[key], item],
    }));
  };

  //Nested Reusable Input OnChange function
  const handleNestedReusableInputChange = (key, index, event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      const updateItem = [...prevFormData[key]];
      updateItem[index][name] = value;
      return {
        ...prevFormData,
        [key]: updateItem,
      };
    });
  };

  // --------------- QUALIFICATION FUNCTIONS STARTS------------------
  // Handle Qualification change
  const handleQualificationInputChange = (event, index) => {
    handleNestedReusableInputChange("qualifications", index, event);
  };
  // Add Qualification Function
  const addQualification = (event) => {
    event.preventDefault();
    addItem("qualifications", {
      startingDate: "",
      endingDate: "",
      degree: "",
      university: "",
    });
  };
  // Delete Qualification
  const deleteQualification = (event, index) => {
    event.preventDefault();
    deleteItem("qualifications", index);
  };
  // --------------- QUALIFICATION FUNCTIONS ENDS------------------

  // --------------- EXPERIENCE FUNCTIONS STARTS------------------
  // Handle Experiences change
  const handleExperienceInputChange = (event, index) => {
    handleNestedReusableInputChange("experiences", index, event);
  };
  // Add Experience Function
  const addExperience = (event) => {
    event.preventDefault();
    addItem("experiences", {
      startingDate: "",
      endingDate: "",
      position: "",
      hospital: "",
    });
  };
  // Delete Experience
  const deleteExperience = (event, index) => {
    event.preventDefault();
    deleteItem("experiences", index);
  };
  // --------------- EXPERIENCE FUNCTIONS ENDS------------------

  // --------------- TIME SLOATS FUNCTIONS STARTS------------------
  // Handle Time Slots change
  const handleTimeSloatInputChange = (event, index) => {
    handleNestedReusableInputChange("timeSlots", index, event);
  };
  // Add Time Slots Function
  const addTimeSloat = (event) => {
    event.preventDefault();
    addItem("timeSlots", {
      day: "",
      startingTime: "",
      endingTime: "",
    });
  };
  // Delete Time Sloat
  const deleteTimeSloats = (event, index) => {
    event.preventDefault();
    deleteItem("timeSlots", index);
  };
  // --------------- TIME SLOATS FUNCTIONS ENDS------------------

  // Custom input section
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
    <div>
      <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
        {" "}
        Profile Information
      </h2>
      <form onSubmit={updateDoctorProfile}>
        <div className="mb-5">
          <p className="form__label">Name*</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Full Name"
            className="form__input"
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-5">
          <p className="form__label">Email*</p>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            className="form__input"
            onChange={handleInputChange}
            readOnly
            aria-readonly
            disabled="true"
          />
        </div>

        <div className="mb-5">
          <p className="form__label">Phone*</p>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            placeholder="Phone Number"
            className="form__input no-spin"
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-5">
          <p className="form__label">Bio</p>
          <input
            type="text"
            name="bio"
            value={formData.bio}
            placeholder="Bio"
            className="form__input"
            onChange={handleInputChange}
            maxLength={100}
          />
        </div>

        <div className="mb-5">
          <div className="grid grid-cols-3 gap-5 mb-[30px]">
            {/* Gender */}
            <div>
              <p className="form__label ">Gender*</p>
              <CustomSelect
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                options={[
                  { value: "", label: "Select" },
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                  { value: "Other", label: "Other" },
                ]}
              />
            </div>

            {/* Specialization */}
            <div>
              <p className="form__label ">Specialization*</p>
              <CustomSelect
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                options={[
                  { value: "", label: "Select" },
                  {
                    value: "Obstetrics & Gynaecology",
                    label: "Obstetrics & gynaecology",
                  },
                  { value: "Neurologist", label: "Neurologist" },
                  { value: "Orthopaedist", label: "Orthopaedist" },
                  { value: "Dentist", label: "Dentist" },
                  { value: "Pulmonologist", label: "Pulmonologist" },
                  { value: "Ophthalmology", label: "Ophthalmology" },
                  { value: "Nephrologist", label: "Nephrologist" },
                  { value: "Audiologist", label: "Audiologist" },
                  { value: "Pediatrician", label: "Pediatrician" },
                  { value: "Radiologist", label: "Radiologist" },
                  { value: "Psychiatrist", label: "Psychiatrist" },
                  { value: "Dermatology", label: "Dermatology" },
                  { value: "Anesthesiology", label: "Anesthesiology" },
                  { value: "Endocrinologist", label: "Endocrinologist" },
                  { value: "Pathology", label: "Pathology" },
                  { value: "Forensic Medicine", label: "Forensic Medicine" },
                  { value: "Cardiologist", label: "Cardiologist" },
                  { value: "General Medicine", label: "General Medicine" },
                  { value: "General Surgery", label: "General Surgery" },
                  { value: "ENT", label: "ENT" },
                  { value: "Oncologist", label: "Oncologist" },
                  {
                    value: "Emergency Physician",
                    label: "Emergency Physician",
                  },
                  { value: "Urology", label: "Urology" },
                  { value: "Geriatrics", label: "Geriatrics" },
                ]}
              />
            </div>

            {/* Ticket Price */}
            <div>
              <p className="form__label*">Ticket Price*</p>
              <input
                type="number"
                placeholder="EX: 100"
                name="ticketPrice"
                value={formData.ticketPrice}
                className="form__input px-4 py-3.5 mt-3 no-spin"
                onChange={handleInputChange}
              />
            </div>
          </div>
          {/* Qualifications */}
          <div>
            <p className="form__label">Qualifications*</p>
            {formData.qualifications?.map((item, index) => (
              <div key={index}>
                <div>
                  {/* Date  */}
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <p className="form__label">Starting Date*</p>
                      <input
                        type="date"
                        name="startingDate"
                        value={item.startingDate}
                        className="form__input"
                        onChange={(e) =>
                          handleQualificationInputChange(e, index)
                        }
                      />
                    </div>

                    <div>
                      <p className="form__label">Ending Date*</p>
                      <input
                        type="date"
                        name="endingDate"
                        value={item.endingDate}
                        className="form__input"
                        onChange={(e) =>
                          handleQualificationInputChange(e, index)
                        }
                      />
                    </div>
                  </div>
                  {/* Degree */}
                  <div className="grid grid-cols-2 gap-5 mt-3">
                    <div>
                      <p className="form__label">Degree*</p>
                      <input
                        type="text"
                        name="degree"
                        value={item.degree}
                        className="form__input"
                        onChange={(e) =>
                          handleQualificationInputChange(e, index)
                        }
                        placeholder="EX:MBBS"
                      />
                    </div>

                    <div>
                      <p className="form__label">University*</p>
                      <input
                        type="text"
                        name="university"
                        value={item.university}
                        className="form__input"
                        onChange={(e) =>
                          handleQualificationInputChange(e, index)
                        }
                        placeholder="EX:VIMS Bangalore"
                      />
                    </div>
                  </div>
                  {/* Button */}
                  <button
                    className="bg-red-400 p-2 rounded-md text-white text-[18px] mt-1 mb-[10px] hover:bg-red-600 transition duration-300 ease-in-out"
                    onClick={(e) => deleteQualification(e, index)}
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
              </div>
            ))}
            <button
              className="bg-[#000] py-2 px-5 rounded-md text-white hover:bg-[#3e3e3e] transition duration-300 ease-in-out"
              onClick={addQualification}
            >
              Add Qualification
            </button>
          </div>

          {/* Experience */}
          <div className="mt-5">
            <p className="form__label">Experiences*</p>
            {formData.experiences?.map((item, index) => (
              <div key={index}>
                <div>
                  {/* Date  */}
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <p className="form__label">Starting Date*</p>
                      <input
                        type="date"
                        name="startingDate"
                        value={item.startingDate}
                        className="form__input"
                        onChange={(e) => handleExperienceInputChange(e, index)}
                      />
                    </div>

                    <div>
                      <p className="form__label">Ending Date*</p>
                      <input
                        type="date"
                        name="endingDate"
                        value={item.endingDate}
                        className="form__input"
                        onChange={(e) => handleExperienceInputChange(e, index)}
                      />
                    </div>
                  </div>
                  {/* Position */}
                  <div className="grid grid-cols-2 gap-5 mt-3">
                    <div>
                      <p className="form__label">Position*</p>
                      <input
                        type="text"
                        name="position"
                        value={item.position}
                        className="form__input"
                        onChange={(e) => handleExperienceInputChange(e, index)}
                        placeholder="EX:junior surgeon"
                      />
                    </div>

                    <div>
                      <p className="form__label">Hospital*</p>
                      <input
                        type="text"
                        name="hospital"
                        value={item.hospital}
                        className="form__input"
                        onChange={(e) => handleExperienceInputChange(e, index)}
                        placeholder="EX:North Bangalore Hospital"
                      />
                    </div>
                  </div>
                  {/* Button */}
                  <button
                    className="bg-red-400 p-2 rounded-md text-white text-[18px] mt-1 mb-[10px] hover:bg-red-600 transition duration-300 ease-in-out"
                    onClick={(e) => deleteExperience(e, index)}
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
              </div>
            ))}
            <button
              className="bg-[#000] py-2 px-5 rounded-md text-white hover:bg-[#3e3e3e] transition duration-300 ease-in-out"
              onClick={addExperience}
            >
              Add Experience
            </button>
          </div>

          {/* Time Sloat */}
          <div className="mt-7">
            <p className="form__label">Time Sloats*</p>
            {formData.timeSlots?.map((item, index) => (
              <div key={index}>
                <div>
                  {/* Date  */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                    <div>
                      <p className="form__label">Days*</p>
                      <CustomSelect
                        name="day"
                        value={item.day}
                        options={[
                          { value: "Monday", label: "Monday" },
                          { value: "Tuesday", label: "Tuesday" },
                          { value: "Wednesday", label: "Wednesday" },
                          { value: "Thursday", label: "Thursday" },
                          { value: "Friday", label: "Friday" },
                          { value: "Saturday", label: "Saturday" },
                          { value: "Sunday", label: "Sunday" },
                        ]}
                        onChange={(e) => handleTimeSloatInputChange(e, index)}
                      />
                    </div>

                    <div>
                      <p className="form__label">Starting Time*</p>
                      <input
                        type="time"
                        name="startingTime"
                        value={item.startingTime}
                        className="form__input"
                        onChange={(e) => handleTimeSloatInputChange(e, index)}
                      />
                    </div>

                    <div>
                      <p className="form__label">Ending Time*</p>
                      <input
                        type="time"
                        name="endingTime"
                        value={item.endingTime}
                        className="form__input"
                        onChange={(e) => handleTimeSloatInputChange(e, index)}
                      />
                    </div>
                    <div className="flex items-center mt-10">
                      <button
                        className="bg-red-400 p-2 rounded-md text-white text-[18px] mt-1 mb-[10px] hover:bg-red-600 transition duration-300 ease-in-out"
                        onClick={(e) => deleteTimeSloats(e, index)}
                      >
                        <AiOutlineDelete />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button
              className="bg-[#000] mt-2 py-2 px-5 rounded-md text-white hover:bg-[#3e3e3e] transition duration-300 ease-in-out"
              onClick={addTimeSloat}
            >
              Add Time Sloat
            </button>
          </div>

          {/* About */}
          <div className="my-5">
            <p className="form__label">About*</p>
            <textarea
              name="about"
              rows={5}
              value={formData.about}
              id="about"
              className="form__input"
              onChange={handleInputChange}
              placeholder="Write about you"
            ></textarea>
          </div>

          {/* Profile Picture */}
          <div className=" mb-10 flex items-center gap-3">
            {formData.photo && (
              <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                <img
                  className="w-full h-full rounded-full object-cover"
                  src={formData.photo}
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
        </div>
        {/* Submit Buttom */}
        <div className="mt-7">
          <button
            type="submit"
            onClick={updateDoctorProfile}
            className="bg-primaryColor text-white btn rounded-md mt-0 w-full"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
