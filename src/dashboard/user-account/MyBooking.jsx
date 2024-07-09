import React from "react";
import { BASE_URL } from "../../config";
import DoctorCard from "../../components/Doctors/DoctorCard";
import Loading from "../../components/Loding/Loding";
import ErrorPage from "../../components/Error/Error";
import userFetchData from "../../hooks/userFetchData";

const MyBooking = () => {
  const {
    data: appointments,
    error,
    loading,
  } = userFetchData(`${BASE_URL}/user/appointments/find`);
  // console.log("-Data", appointments);
  // console.log("Loading", loading);
  // console.log("Error", error);
  return (
    <div>
      {loading && !error && <Loading />}
      {error && <ErrorPage errorMessage={error} />}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {appointments.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor.doctor} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBooking;
