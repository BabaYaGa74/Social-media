import React, { useContext } from "react";
import NavBar from "./components/navBar/Navbar";
import { Outlet } from "react-router-dom";
import { DarkModeContext } from "./context/darkModeContext";
import "./style.scss";
import Footer from "./components/footer/Footer";

const Layout = () => {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div
      className={`theme-${darkMode ? "dark" : "light"}`}
      style={{ margin: 0, padding: 0 }}
    >
      <NavBar />
      <div style={{ display: "flex" }}>
        <div style={{ flex: 7 }}>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
