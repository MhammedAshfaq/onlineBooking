import React from "react";
import heroImg01 from "../assets/images/hero-img01.png";
import heroImg02 from "../assets/images/hero-img02.png";
import heroImg03 from "../assets/images/hero-img03.png";
import icon01 from "../assets/images/icon01.png";
import icon02 from "../assets/images/icon02.png";
import icon03 from "../assets/images/icon03.png";
import faqImage from "../assets/images/faq-img.png";
import FeatureImg from "../assets/images/feature-img.png";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import About from "../components/About/About";
import ServiceList from "../components/Services/serviceList";
import DoctorList from "../components/Doctors/DoctorList";
import FaqList from "../components/faq/FaqList";
import Testimonial from "../components/Testimonial/Testimonial";

const Home = () => {
  return (
    <>
      {/*  ======== hero section ======== */}

      <section className="hero__section pt-[60px] h-[800px]">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
            {/* ======= hero content ======= */}
            <div>
              <div className="lg:w-[570px]">
                <h1 className="text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[70px]">
                  {" "}
                  We help patients live a healthy, longer life
                </h1>
                <p className="text__para">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s,
                </p>
                <button className="btn"> Request an Appointment</button>
              </div>

              {/* ======= hero counter ======== */}
              <div className="mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-6">
                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[500]">
                    30+
                  </h2>
                  <span className="w-[100px] h-2 bg-yellowColor rounded-full block mt-[-14px]"></span>
                  <p className="text__para">Year of Experience</p>
                </div>

                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[500]">
                    5+
                  </h2>
                  <span className="w-[100px] h-2 bg-purpuleColor rounded-full block mt-[-14px]"></span>
                  <p className="text__para">Clinic Location</p>
                </div>

                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[500]">
                    100%
                  </h2>
                  <span className="w-[100px] h-2 bg-irisBlueColor rounded-full block mt-[-14px]"></span>
                  <p className="text__para">Patient Satisfaction</p>
                </div>
              </div>
            </div>

            {/* ======== hero content doctors ======== */}
            <div className="flex gap-[30px] justify-center">
              <div>
                <img src={heroImg01} alt="Doctor01" />
              </div>
              <div className="mt-[50px]">
                <img
                  src={heroImg02}
                  alt="Doctor02"
                  className="w-full mb-[30px]"
                />
                <img src={heroImg03} alt="Doctor03" className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*  ======== hero section end ======== */}

      {/*  ======== Second section ======== */}
      <section>
        <div className="container">
          <div className="lg:w-[470px] mx-auto">
            <h2 className="heading text-center">
              Providing the best medical services
            </h2>
            <p className="text__para text-center">
              World-class care for everyone. Our health System offers unmatched,
              expert health care
            </p>
          </div>

          {/*  */}
          <div className="grid grid-cols-1 md:grid-cols2 lg:grid-cols-3 gap-3 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
            {/* Find a doctor */}
            <div className="py-[30px] px-5">
              <div className="flex items-center justify-center">
                <img src={icon01} alt="" />
              </div>

              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[600] text-center">
                  Find a Doctor
                </h2>
                <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                  World-class care for everyone. Our health System offers
                  unmatche, expert health care. Form the lab to the clinic
                </p>
                <Link
                  to={"/doctors"}
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>
              </div>
            </div>

            {/*  Find a Location */}
            <div className="py-[30px] px-5">
              <div className="flex items-center justify-center">
                <img src={icon02} alt="" />
              </div>

              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[600] text-center">
                  Find a Location
                </h2>
                <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                  World-class care for everyone. Our health System offers
                  unmatche, expert health care. Form the lab to the clinic
                </p>
                <Link
                  to={"/doctors"}
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>
              </div>
            </div>

            {/* Book Appointment */}

            <div className="py-[30px] px-5">
              <div className="flex items-center justify-center">
                <img src={icon03} alt="" />
              </div>

              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[600] text-center">
                  Book Appointment
                </h2>
                <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                  World-class care for everyone. Our health System offers
                  unmatche, expert health care. Form the lab to the clinic
                </p>
                <Link
                  to={"/doctors"}
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*  ======== Second section end ======== */}

      {/* ========= About Section Start ======= */}
      <About />
      {/* ========= About Section End =======  */}

      {/* ========= Service Section Start ======= */}
      <section>
        <div className="container">
          <div className="xl:w-[470px] my-auto">
            <h2 className="heading text-center"> Our medical services</h2>
            <p className="text__para text-center">
              World-class care for everyone. Our health System offers unmatched,
              expert health case.
            </p>
          </div>
          <ServiceList />
        </div>
      </section>
      {/* ========= Service Section End =======  */}

      {/* ========= feature Section Start =======  */}
      <section>
        <div className="container">
          <div className="flex items-center justify-between flex-col lg:flex-row">
            {/* feature content */}
            <div className="xl:w-[670px]">
              <h className="heading">Get virtual treatment</h>

              <ul className="pl-4">
                <li className="text__para">
                  1. Schedule the appointment directly.
                </li>

                <li className="text__para">
                  2. Search for your physician here, and contact their office.
                </li>

                <li className="text__para">
                  3. View our physicians who are accepting new patient, use the
                  online scheduling tool to select an appointment time
                </li>
              </ul>
              <Link to={"/"} className="btn ml-4">
                <button className="mt-7"> Learn more</button>
              </Link>
            </div>
            {/* feature image */}
            <div className="relative z-10 xl:w-[770px] flex justify-end mt-[50px] lg:mt-0">
              <img src={FeatureImg} alt="" className="w-3/4" />
            </div>
          </div>
        </div>
      </section>
      {/* ========= feature Section End =======  */}

      {/* ========= Our Doctor Start =======  */}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">Our great doctors</h2>
            <p className="text__para text-center">
              World-class care for everyone. Our health System offered
              unmatched, expert health care.
            </p>
          </div>
          <DoctorList />
        </div>
      </section>
      {/* ========= Our Doctor End =======  */}

      {/* ========= Faq Section Start========== */}
      <section>
        <div className="container">
          <div className="flex justify-between gap-[50px] lg:gap-0">
            <div className="w-1/2 hidden md:block">
              <img src={faqImage} alt="" />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="heading">Most question by our deloved patients</h2>

              <FaqList />
            </div>
          </div>
        </div>
      </section>
      {/* ========= Faq Section End========== */}

      {/* ========= Testimonial Section Start========== */}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">What our patient say</h2>
            <p className="text__para text-center">
              World-class care for everyone, Our health System offers unmatched,
              expert health care.
            </p>
          </div>
          <Testimonial/>
        </div>
      </section>
      {/* ========= Testimonial Section End========== */}
    </>
  );
};

export default Home;
