import React from "react";
import { FaHome, FaComments, FaFileMedical, FaCog } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import "./BottomNav.css";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="bottom-nav">
      <div
        className={`nav-item${location.pathname === "/" ? " active" : ""}`}
        onClick={() => navigate("/")}
      >
        <FaHome />
        <span>Home</span>
      </div>
      <div
        className={`nav-item${location.pathname === "/health-assistant" ? " active" : ""}`}
        onClick={() => navigate("/health-assistant")}
      >
        <FaComments />
        <span>Assistant</span>
      </div>
      <div
        className={`nav-item${location.pathname === "/medical-records" ? " active" : ""}`}
        onClick={() => navigate("/medical-records")}
      >
        <FaFileMedical />
        <span>Records</span>
      </div>
      <div
        className={`nav-item${location.pathname === "/settings" ? " active" : ""}`}
        onClick={() => navigate("/settings")}
      >
        <FaCog />
        <span>Settings</span>
      </div>
    </div>
  );
};

export default BottomNav;
