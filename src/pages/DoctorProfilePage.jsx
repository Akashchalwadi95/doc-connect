import React from "react";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import "./DoctorProfilePage.css";

const DoctorProfilePage = ({ onBack }) => {
  return (
    <div className="doctor-profile-container">
      <div className="doctor-profile-header">
        <button className="back-btn" onClick={onBack || (() => window.history.back())}>
          <FaArrowLeft />
        </button>
        <h2>My Profile</h2>
      </div>
      <div className="doctor-profile-card">
        <div className="doctor-profile-avatar">h</div>
        <div className="doctor-profile-photo-link">Change Photo</div>
        <form className="doctor-profile-form">
          <label>Full Name *</label>
          <input placeholder="Full Name" />
          <label>Specialty *</label>
          <input placeholder="Specialty" />
          <label>Qualifications</label>
          <input placeholder="Qualifications" />
          <label>Experience (Years)</label>
          <input placeholder="Experience (Years)" />
          <label>Clinic Address</label>
          <textarea placeholder="Clinic Address" />
          <label>Consultation Fees</label>
          <input placeholder="Consultation Fees" />
          <label>Phone *</label>
          <input placeholder="Phone" />
          <label>Email</label>
          <input placeholder="Email" />
          <label>Available Hours</label>
          <input placeholder="Available Hours" />
          <button className="save-profile-btn" type="submit">
            <FaSave /> Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default DoctorProfilePage;