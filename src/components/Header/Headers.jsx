import { useEffect, useRef, useState, useContext } from "react";
import logo from "../../assets/images/logo.png";
import "../../index.css";
import { Link, NavLink } from "react-router-dom";
import Avatar from "../../assets/images/avatar.1.jpeg";
import { BiMenu } from "react-icons/bi";
import { authContext } from "../../context/authContext";

const navLink = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/doctors",
    display: " Find a Doctor",
  },
  {
    path: "/service",
    display: "Services",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

export default function Header() {
  //   const headerRef = useRef(null);
  //   const menuRef = useRef(null);

  //   const handleStickyHeader = () => {
  //     window.addEventListener("scroll", () => {
  //       if (
  //         document.body.scrollTop > 80 ||
  //         document.documentElement.scrollTop > 80
  //       ) {
  //         headerRef.current.classList.add("sticky_header");
  //       } else {
  //         headerRef.current.classList.remove("sticky_header");
  //       }
  //     });
  //   };

  // useEffect(() => {
  // handleStickyHeader();
  // return () => window.removeEventListener("scroll", handleStickyHeader);
  // });

  // const toggleMenu = () => menuRef.current.classList.toggle('show_menu')
  const { user, role, token } = useContext(authContext);
  // console.log("user", user);
  // console.log("role", role);
  // console.log("toke", token);
  // console.log("---------")
  return (
    <header className="header flex items-center" /*ref={headerRef}*/>
      <div className="container">
        <div className="flex items-center justify-between">
          {/* ====== logo ======= */}
          <div>
            <img src={logo} alt="logo" />
          </div>

          {/* ====== menu ====== */}
          <div
            className="navigation" /*ref={menuRef}*/ /*onClick={toggleMenu}*/
          >
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLink.map((link, index) => (
                <li key={index}>
                  {" "}
                  <NavLink
                    className={(navClass) =>
                      navClass.isActive // navCalss.isActive means that perticular nav item clicked or not we can know
                        ? "text-primaryColor text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                    }
                    to={link.path}
                  >
                    {link.display}
                  </NavLink>{" "}
                </li>
              ))}
            </ul>
          </div>
          {}
          {/* ========= nav right ======== */}
          <div className="flex items-center gap-4">
            {user && token ? (
              <div className="flex items-center ">
                <div>
                  <Link
                    to={`${
                      role === "doctor" ? "/doctor/profile" : "user/profile"
                    }`}
                  >
                    <figure className="w-[45px] h-[45px] rounded-full overflow-hidden">
                      <img
                        className="w-full h-full rounded-full  object-cover"
                        src={user?.photo}
                        alt="Profile logo"
                      />
                    </figure>
                  </Link>
                </div>
                <div>
                  <h2 className=" text-center text__para mt-0 ml-3 text-[16px] leading-7 font-[500]">
                    {user?.name}
                  </h2>
                </div>
              </div>
            ) : (
              <Link to="login">
                <button className="bg-primaryColor text-white px-5 py-2 font-[600]  flex items-center justify-center rounded-[50px]">
                  Login
                </button>
              </Link>
            )}

            {/* login button */}

            {/* menu ison */}
            <span className="md:hidden" /*onClick={toggleMenu}*/>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
