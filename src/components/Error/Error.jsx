import React from "react";
import { ExclamationCircleIcon } from "@heroicons/react/solid";

const Error = ({ errorMessage }) => {
  return (
    // <div className="flex items-center justify-center w-full h-[50vh]">
    //   <h3 className="text-headingColor text-[20px] leading-[30px] font-semibold">
    //     {errorMessage}
    //   </h3>
    // </div>

    <div className="flex flex-col items-center justify-center w-full h-[50vh] mt-2">
      <ExclamationCircleIcon className="w-16 h-16 text-gray-400 mb-4" />
      <h3 className="text-gray-800 text-[24px] leading-[32px] font-semibold">
        {errorMessage || "No Data Found"}
      </h3>
      <p className="text__para text-[16px] leading-[24px]">
        We couldn't find any data. Please try again later or contact support.
      </p>
    </div>
  );
};

export default Error;

