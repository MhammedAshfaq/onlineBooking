import React from "react";
import { Route, Routes } from "react-router-dom";

// Pages
import Home from "../pages/Home";
import Service from "../pages/Service";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Contact from "../pages/Contact";
import Doctor from "../pages/Doctor/Doctor";
import DoctorDeatils from "../pages/Doctor/DoctorDetails";
import MyAccount from "../dashboard/user-account/MyAccount";
import Dashboard from "../dashboard/doctor-account/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import CheckoutSuccess from "../pages/CheckoutSuccess";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/service" element={<Service />} />
      <Route path="/doctors" element={<Doctor />} />
      <Route path="/doctor/:id" element={<DoctorDeatils />} />
      <Route path="/checkout-success" element={<CheckoutSuccess />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:id/:token" element={<ResetPassword />} />

      <Route
        path="/user/profile"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <MyAccount />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/profile"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default Routers;
