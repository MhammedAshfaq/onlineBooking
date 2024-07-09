import React from "react";
import { formateDate } from "../../utils/formateDate";

const DoctorAbout = ({ name, about, qualifications, experiences }) => {
  return (
    <div>
      <div>
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2">
          About of{" "}
          <span className="text-irisBlueColor font-bold text-[24px] leading-9">
            {name ? name : "N/A"}
          </span>
        </h3>
        <p className="text__para">{typeof about == 'undefined' && <span className= "text-irisBlueColor text-[15px] leading-6 font-semibold ml-6">No about added</span>} {about}</p>
      </div>
      {/* Education */}
      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
          Education
        </h3>

        <ul className="pt-4 md:p-5">
          {qualifications && qualifications.length === 0 && (
            <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">
              {" "}
              No Education Added!
            </span>
          )}
          {qualifications?.map((item, index) => (
            <li
              key={index}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]"
            >
              <div>
                <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">
                  {formateDate(item.startingDate)} -{" "}
                  {formateDate(item.endingDate)}
                </span>
                <p className="text-[16px] leading-6 font-medium text-textColor">
                  {item.degree}
                </p>
              </div>
              <p className="text-[14px] leading-5 font-medium">
                {item.university}
              </p>
            </li>
          ))}
        </ul>
      </div>
      {/* Experience */}
      <div className="mt-5">
        <h2 className="text-[20px] leading-[30px] text-headingColor font-semibold">
          {" "}
          Experience
        </h2>

        <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5">
          {experiences && experiences.length === 0 && (
            <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">
              {" "}
              No Experience Added!
            </span>
          )}
          {experiences?.map((item, index) => (
            <li key={index} className="p-4 rounded bg-[#fff9ea]">
              <span className="text-yellowColor text-[15px] leading-6 font-semibold">
                {formateDate(item.startingDate)} -{" "}
                {formateDate(item.endingDate)}
              </span>
              <p className="text-[16px] leading-6 font-medium text-textColor">
                {item.position}
              </p>
              <p className="text-[14px] leading-5 font-medium text-textColor">
                {item.hospital}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DoctorAbout;
