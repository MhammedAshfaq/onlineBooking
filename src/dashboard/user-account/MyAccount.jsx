/* eslint-disable jsx-a11y/img-redundant-alt */
import { useContext, useState } from "react";
import { authContext } from "../../context/authContext";
import MyBooking from "./MyBooking";
import UserProfile from "./UserProfile";
import useGetProfileHook from "../../hooks/userFetchData";
import { BASE_URL } from "../../config";
import Loding from "../../components/Loding/Loding";
import ErrorPage from "../../components/Error/Error";

const MyAccount = () => {
  const { user: userData, dispatch } = useContext(authContext);

  const [tap, setTap] = useState("bookings");

  // Calling hook
  // const {
  //   data: userData,
  //   loading,
  //   error,
  // } = useGetProfileHook(`${BASE_URL}/user/profile/details`);

  // Logout function
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

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
    <section>
      <div className="max-w-[1170px] px-5 mx-auto h-[50vh]">
        {/* {loading && !error && <Loding />}
        {error && !loading && <ErrorPage errorMessage={error} />} */}
        {/* {!loading && !error && ( */}
        <div className="grid md:grid-cols-3 gap-10">
          <div className="pb-[50px] px-[30px] rounded-md">
            <div className="flex items-center justify-center">
              <figure className="w-[150px] h-[150px] rounded-full border-2 border-solid border-primaryColor">
                <img
                  className="w-full h-full rounded-full object-cover"
                  src={userData.photo}
                  alt="user image"
                />
              </figure>
            </div>

            <div className="text-center mt-4">
              <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">
                {userData && userData.name}
              </h3>

              <p className="text-textColor text-[15px] leading-8 font-medium">
                {userData && userData.email}
              </p>

              <p className="text-textColor text-[15px] leading-6 font-medium">
                Blood Type:{" "}
                <span className="ml-2 text-headingColor leading-8 font-bold bg-emerald-400 py-1 px-3 rounded">
                  {userData && userData.bloodType ? userData.bloodType : "N/A"}
                </span>
              </p>
            </div>

            <div className=" mt-[30px] md:mt-[50px]">
              <button
                className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white font-medium"
                onClick={handleLogout}
              >
                {" "}
                Logout{" "}
              </button>
              <button className="w-full bg-red-600 p-3 mt-4 rounded-md text-[16px] leading-7 text-white font-medium">
                {" "}
                Delete{" "}
              </button>
            </div>
          </div>

          <div className="md:col-span-2 md:px-[30px]">
            <div>
              <button
                className={` ${
                  tap === "bookings" && "bg-primaryColor text-white font-normal"
                } py-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
                onClick={() => setTap("bookings")}
              >
                My Bookings
              </button>
              <button
                className={`  ${
                  tap === "settings" && "bg-primaryColor text-white font-normal"
                } py-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
                onClick={() => setTap("settings")}
              >
                Profile Setting
              </button>
            </div>
            {tap === "bookings" && <MyBooking />}
            {tap === "settings" && <UserProfile user={userData} />}
          </div>
        </div>
        {/* )} */}
      </div>
    </section>
  );
};

export default MyAccount;
