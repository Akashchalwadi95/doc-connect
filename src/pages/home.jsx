import React from "react";
import "./Home.css";
import BottomNav from "../components/BottomNav";
import {
  FaHeart,
  FaCalendarAlt,
  FaPhoneAlt,
  FaComments,
  FaFileMedical,
  FaCog,
  FaSyringe,
  FaQuestionCircle,
  FaHistory,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Header */}
      <div className="header">
        <div className="header-top">
          <div className="logo">
            <FaHeart className="logo-icon" />
            <span>DocConnect AI</span>
          </div>
          <div className="settings-icon">
            <FaCog />
          </div>
        </div>

        <div className="header-text">
          <p>Hello,</p>
          <h2>Shadow</h2>
          <span>How can we help you today?</span>
        </div>
      </div>    

      {/* Upcoming Card */}
      <div className="upcoming-card">
        <div className="card-left">
          <div className="icon-box green">
            <FaCalendarAlt />
          </div>
          <div>
            <p className="small-text">Upcoming</p>
            <h4>View Appointments</h4>
          </div>
        </div>
        <span className="arrow">›</span>
      </div>

      {/* Grid Section */}
      <div className="grid-section">
        <div className="grid-card" onClick={() => navigate("/call-doctor")} style={{ cursor: "pointer" }}>
          <div className="icon-box green">
            <FaPhoneAlt />
          </div>
          <h4>Call a Doctor</h4>
        </div>

        <div className="grid-card" onClick={() => navigate("/book-appointment")} style={{ cursor: "pointer" }}>
          <div className="icon-box green">
            <FaCalendarAlt />
          </div>
          <h4>Book Appointment</h4>
        </div>

        <div className="grid-card" onClick={() => navigate("/health-assistant")} style={{ cursor: "pointer" }}>
          <div className="icon-box blue">
            <FaComments />
          </div>
          <h4>Health Assistant</h4>
        </div>

        <div className="grid-card" onClick={() => navigate("/medical-records")} style={{ cursor: "pointer" }}>
          <div className="icon-box purple">
            <FaFileMedical />
          </div>
          <h4>Medical Records</h4>
        </div>

        <div className="grid-card" onClick={() => navigate("/appointments")} style={{ cursor: "pointer" }}>
          <div className="icon-box brown">
            <FaFileMedical />
          </div>
          <h4>Appointments</h4>
        </div>

        <div className="grid-card" onClick={() => navigate("/vaccination")} style={{ cursor: "pointer" }}>
          <div className="icon-box pink">
            <FaSyringe />
          </div>
          <h4>Vaccination</h4>
        </div>

        <div className="grid-card" onClick={() => navigate("/help-desk")} style={{ cursor: "pointer" }}>
          <div className="icon-box cyan">
            <FaQuestionCircle />
          </div>
          <h4>Help Desk</h4>
        </div>

        <div className="grid-card" onClick={() => navigate("/history")} style={{ cursor: "pointer" }}>
          <div className="icon-box purple">
            <FaHistory />
          </div>
          <h4>History</h4>
        </div>
      </div>

      {/* Emergency Button */}
      <div className="emergency-btn">
        <FaPhoneAlt />
      </div>

      <BottomNav />
    </div>
  );
};

export default Home;
