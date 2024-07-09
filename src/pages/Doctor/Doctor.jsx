import React, { useEffect, useState } from "react";
// import { doctors } from "../../assets/data/doctors";
import DoctorCard from "../../components/Doctors/DoctorCard";
import { BASE_URL } from "../../config";
import userFetchData from "../../hooks/userFetchData";
import Loader from "../../components/Loding/Loding";
import Error from "../../components/Error/Error";

const Doctor = () => {
  const [query, setQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState("");

  const {
    data: doctors,
    loading,
    error,
  } = userFetchData(`${BASE_URL}/doctor/doctors/list?query=${debounceQuery}`);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceQuery(query);
    }, 700);

    return () => clearTimeout(timeout);
  }, [query]);

  const handleSerach = (e) => {
    setQuery(query.trim());
  };
  return (
    <>
      <section className="bg-[#fff9ea]">
        <div className="container text-center">
          <h2 className="heading">Find a Doctor</h2>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
            <input
              type="search"
              placeholder="Search doctor by name or specification"
              className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="btn mt-0 rounded-[0px] rounded-r-md"
              onClick={handleSerach}
            >
              Search
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          {loading && <Loader />}
          {error && <Error errorMessage={error} />}
          {!error && !loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {doctors?.map((item, index) => (
                <DoctorCard doctor={item} key={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Doctor;
