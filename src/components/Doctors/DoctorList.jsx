import React, { useEffect, useState } from "react";
// import { doctors } from "../../assets/data/doctors";
import DoctorCard from "./DoctorCard";
import { BASE_URL } from "../../config";
import userFetchData from "../../hooks/userFetchData";
import Loader from "../Loding/Loding";
import Error from "../Error/Error";

const DoctorList = () => {
  const {data:doctors,loader,error} = userFetchData(`${BASE_URL}/doctor/doctors/list`)
  return (
    <>
    {loader && <Loader/>}
    {error && <Error errorMessage={error}/>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
        {doctors.map((doctor, index) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </>
  );
};

export default DoctorList;
