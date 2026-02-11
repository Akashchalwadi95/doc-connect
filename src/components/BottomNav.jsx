import React from "react";
import { FaHome, FaComments, FaFileMedical, FaCog } from "react-icons/fa";
import "./BottomNav.css";

const BottomNav = () => {
  return (
    <div className="bottom-nav">
      <div className="nav-item active">
        <FaHome />
        <span>Home</span>
      </div>

      <div className="nav-item">
        <FaComments />
        <span>Assistant</span>
      </div>

      <div className="nav-item">
        <FaFileMedical />
        <span>Records</span>
      </div>

      <div className="nav-item">
        <FaCog />
        <span>Settings</span>
      </div>
    </div>
  );
};

export default BottomNav;
