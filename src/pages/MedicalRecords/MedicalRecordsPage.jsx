import React, { useState } from "react";
import { FaArrowLeft, FaFileMedical, FaUpload, FaTimes } from "react-icons/fa";
import BottomNav from "../../components/BottomNav";
import "./MedicalRecordsPage.css";

// Modal component for uploading medical record
const UploadMedicalRecordModal = ({ onClose }) => (
  <>
    <div className="modal-overlay" onClick={onClose}></div>
    <div className="modal">
      <button className="modal-close" onClick={onClose}><FaTimes /></button>
      <h2>Upload Medical Record</h2>
      <form className="upload-record-form">
        <input placeholder="Title" />
        <select>
          <option>Prescription</option>
          <option>Lab Report</option>
          <option>Discharge Summary</option>
          <option>Other</option>
        </select>
        <input placeholder="Folder name (optional)" />
        <input placeholder="dd-mm-yyyy" type="date" />
        <label className="file-label">
          <b>Choose File</b>
          <input type="file" style={{ display: "none" }} />
        </label>
        <div className="file-info">No file chosen</div>
        <div className="file-note">
          <small>
            &#9432; Maximum file size: 10MB. Supported formats: PDF, JPG, PNG
          </small>
        </div>
        <button className="upload-btn" type="submit">Upload</button>
      </form>
    </div>
  </>
);

const MedicalRecordsPage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="home-container">
      <div className="header">
        <div className="header-top">
          <button className="back-btn" onClick={() => window.history.back()}>
            <FaArrowLeft />
          </button>
          <span style={{ fontWeight: "bold", fontSize: "1.5rem", marginLeft: 12 }}>Medical Records</span>
          <div style={{ flex: 1 }} />
          <div className="settings-icon" onClick={() => setShowModal(true)} style={{ cursor: "pointer" }}>
            <FaUpload />
          </div>
        </div>
      </div>
      <div className="medical-records-content">
        <div className="medical-records-icon">
          <FaFileMedical size={60} />
        </div>
        <h3>No Medical Records</h3>
        <p>
          Upload your medical documents, prescriptions, and reports to keep them organized.
        </p>
        <button className="upload-btn" onClick={() => setShowModal(true)}>
          <FaUpload style={{ marginRight: 8 }} />
          Upload First Record
        </button>
      </div>
      <BottomNav />
      {showModal && <UploadMedicalRecordModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default MedicalRecordsPage;