import React from "react";
import Header from "../components/Header/Headers";
import Routers from "../routes/router";
import Footer from "../components/Footer/Footer";
import { useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();

  // Check if the current path is the user profile route
  const isUserProfileRoute = location.pathname === "/user/profile";
  return (
    <div>
      {/* header */}
      <Header />

      {/* mian section */}
      <main>
        <Routers />
      </main>

      {/* footer */}

      {!isUserProfileRoute && <Footer />}
    </div>
  );
}

export default Layout;
