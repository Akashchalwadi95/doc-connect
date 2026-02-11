import React, { useState } from "react";
import { FaArrowLeft, FaPhoneAlt, FaExclamationTriangle, FaClock, FaPlus } from "react-icons/fa";
import "./home.css";
import "./CallDoctorPage.css";
import { useNavigate } from "react-router-dom";

const AddDoctorModal = ({ onClose }) => (    
  <>
    <div className="modal-overlay" onClick={onClose}></div>
    <div className="modal">
      <button className="modal-close" onClick={onClose}>&times;</button>
      <h2>Add New Doctor</h2>
      <form className="add-doctor-form">
        <input placeholder="Name *" />
        <input placeholder="Specialty *" />
        <input placeholder="Phone *" />
        <input placeholder="Email" />
        <input placeholder="Qualifications (e.g., MBBS, MD)" />
        <input placeholder="Years of Experience" />
        <input placeholder="Consultation Fees (₹)" />
        <textarea placeholder="Clinic Address" />
        <input placeholder="Languages (comma separated)" />
        <input placeholder="Available Hours (e.g., 9:00 AM - 5:00 PM)" />
        <div className="form-row">
          <label>Available for Emergency</label>
          <input type="checkbox" />
        </div>
        <button className="add-doctor-btn" type="submit">Add Doctor</button>
      </form>
    </div>
  </>
);

const CallDoctorPage = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Header */}
      <div className="call-doctor-header">
        <div className="call-doctor-header-row">
          <FaArrowLeft style={{ cursor: "pointer" }} onClick={() => window.history.back()} />
          <h2>Call a Doctor</h2>
          <div className="call-doctor-add-btn" onClick={() => setShowModal(true)}>
            <FaPlus />
          </div>
        </div>
        <div className="call-doctor-search">
          <input type="text" placeholder="Search doctors..." />
        </div>
      </div>

      {/* Emergency Available */}
      <div className="emergency-section">
        <div className="emergency-label">
          <FaExclamationTriangle /> Emergency Available
        </div>
        <div
          className="emergency-card">
          <div className="emergency-card-row"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/doctor-profile")}
          >
            <div className="emergency-avatar">h</div>
            <div className="emergency-card-details">
              <div className="name">hjkl</div>
              <div className="desc">asdfgasdfg</div>
              <div className="extra">wertyui</div>
              <div className="time">
                <FaClock /> we
              </div>
            </div>
          </div>
          <div className="emergency-card-actions">
            <button className="call-now-btn">
              <FaPhoneAlt /> Call Now
            </button>
            <div className="emergency-alert-btn">
              <FaExclamationTriangle color="#ef4444" />
            </div>
          </div>
        </div>
      </div>

      {/* All Doctors */}
      <div className="all-doctors-label">
        All Doctors
      </div>

      {/* Emergency Floating Button */}
      <div className="sos-fab-container">
        <div className="sos-fab">
          <FaPhoneAlt size={28} color="#fff" />
          <div className="sos-fab-alert">
            <FaExclamationTriangle color="#ef4444" size={12} />
          </div>
        </div>
        <span className="sos-fab-label">SOS</span>
      </div>

      {/* Modal */}
      {showModal && <AddDoctorModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default CallDoctorPage;