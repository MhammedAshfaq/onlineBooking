import React, { useContext } from "react";
import { BiMenu } from "react-icons/bi";
import { authContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const Tab = ({ tab, setTab }) => {
  const { dispatch } = useContext(authContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };
  return (
    <div>
      <span className="lg:hidden">
        <BiMenu className="w-6 h-6 cursor-pointer" />
      </span>
      <div className="hidden lg:flex flex-col p-[20px] bg-white shadow-panelShadow items-center h-max rounded-md">
        <button
          className={`${
            tab === "overview"
              ? "bg-indigo-100 text-primaryColor"
              : "bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md`}
          onClick={() => setTab("overview")}
        >
          Overview
        </button>
        <button
          className={`${
            tab === "appointments"
              ? "bg-indigo-100 text-primaryColor"
              : "bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md`}
          onClick={() => setTab("appointments")}
        >
          Appointments
        </button>
        <button
          className={`${
            tab === "settings"
              ? "bg-indigo-100 text-primaryColor"
              : "bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md`}
          onClick={() => setTab("settings")}
        >
          Profile
        </button>

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
    </div>
  );
};

export default Tab;
