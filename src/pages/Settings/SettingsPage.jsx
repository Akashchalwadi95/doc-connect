import React from "react";
import { FaArrowLeft, FaUser, FaGlobe, FaMoon, FaIdBadge, FaSignOutAlt } from "react-icons/fa";
import "./SettingsPage.css";
import { signOut, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const auth = getAuth();
    try{
      await signOut(auth);
      navigate("/"); // redirect to login page
    } catch (error) {
      alert("Logout failed. Please try again.");
    }
};
 
return (

  <div className="settings-container">
    <div className="settings-header">
      <button className="back-btn" onClick={() => window.history.back()}>
        <FaArrowLeft />
      </button>
      <h2>Settings</h2>
    </div>
    <div className="settings-list">
      <div className="settings-item">
        <div className="settings-icon user"><FaUser /></div>
        <div>
          <div className="settings-title">Shadow</div>
          <div className="settings-desc">darkblazingfumes@gmail.com</div>
        </div>
      </div>
      <div className="settings-item">
        <div className="settings-icon globe"><FaGlobe /></div>
        <div>
          <div className="settings-title">Language</div>
          <div className="settings-desc">English</div>
        </div>
      </div>
      <div className="settings-item">
        <div className="settings-icon theme"><FaMoon /></div>
        <div>
          <div className="settings-title">Theme</div>
          <div className="settings-desc">Dark Mode</div>
        </div>
        <div className="settings-switch">
          <input type="checkbox" checked readOnly />
        </div>
      </div>
      <div className="settings-item">
        <div className="settings-icon abha"><FaIdBadge /></div>
        <div>
          <div className="settings-title">ABHA Integration</div>
          <div className="settings-desc">Link your health ID</div>
        </div>
      </div>
    </div>
    <button className="logout-btn" onClick={handleLogout}>
      <FaSignOutAlt style={{ marginRight: 8 }} />
      Logout
    </button>
  </div>
);
};

export default SettingsPage;