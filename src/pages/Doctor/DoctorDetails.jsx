import React from "react";
import doctorImg from "../../assets/images/doctor-img01.png";
import starIcon from "../../assets/images/Star.png";
import { useState } from "react";
import DoctorAbout from "./DoctorAbout";
import DoctorFeedback from "./DoctorFeedback";
import SidePanel from "./SidePanel";
import { BASE_URL } from "../../config";
import userFetchData from "../../hooks/userFetchData";
import Error from "../../components/Error/Error";
import Loding from "../../components/Loding/Loding";
import { useParams } from "react-router-dom";

const DoctorDetails = () => {
  const [tab, setTab] = useState("about");
  const { id } = useParams();

  const {
    data: doctorDetails,
    loading,
    error,
  } = userFetchData(`${BASE_URL}/doctor/${id}`);
  console.log("DOCTOR details ",doctorDetails)
  const {
    name,
    qualifications,
    experiences,
    timeSlots,
    reviews,
    bio,
    about,
    averageRating,
    totalRating,
    specialization,
    ticketPrice,
    photo,
  } = doctorDetails;
  // console.log("DOCTOR DETAILS",doctorDetails)

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && <Loding />}
        {error && <Error />}
        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-[50px]">
            <div className="md:col-span-2">
              {/* First section */}
              <div className="flex items-center gap-3">
                <figure /*className="max-w-[200px] max-h-[200px]"*/>
                  <img
                    src={photo}
                    alt=""
                    className="w-64 h-64 object-contain"
                  />
                </figure>
                <div>
                  <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
                    {specialization ? specialization : "N/A"}
                  </span>
                  <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold">
                    {name}
                  </h3>
                  <div className="flex items-center gap-[6px]">
                    <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                      <img src={starIcon} alt="" /> {averageRating}
                    </span>
                    <span className="text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
                      ({totalRating})
                    </span>
                  </div>

                  <p className="text__para text-[14px] leading-5 md:text-[15px] lg:max-w-[390px] text-textColor">
                    {bio}
                  </p>
                </div>
              </div>

              {/* second section */}
              <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
                <button
                  onClick={() => setTab("about")}
                  className={`${
                    tab == "about" &&
                    "border-b border-solid border-primaryColor"
                  } py-4 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
                >
                  About
                </button>
                <button
                  onClick={() => setTab("feedback")}
                  className={`${
                    tab == "feedback" &&
                    "border-b border-solid border-primaryColor"
                  } py-4 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
                >
                  Feedback
                </button>
              </div>

              {/* section third */}
              <div className="mt-[50px]">
                {tab === "about" && (
                  <DoctorAbout
                    name={name}
                    about={about}
                    qualifications={qualifications}
                    experiences={experiences}
                  />
                )}
                {tab === "feedback" && (
                  <DoctorFeedback reviews={reviews} totalRating={totalRating} />
                )}
              </div>
            </div>
            <div>
              <SidePanel timeSloat={timeSlots} price={ticketPrice} doctorId={doctorDetails._id}/>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DoctorDetails;
