import React, { useState } from "react";
import { FaArrowLeft, FaBell, FaTimes, FaCalendarAlt, FaClock } from "react-icons/fa";
import "./vaccinationPage.css";

// Modal component for adding vaccination reminder
const AddVaccinationModal = ({ onClose }) => (
  <>
    <div className="modal-overlay" onClick={onClose}></div>
    <div className="modal">
      <button className="modal-close" onClick={onClose}><FaTimes /></button>
      <h2>Add Vaccination Reminder</h2>
      <form className="add-vaccination-form">
        <input placeholder="Vaccine Name" />
        <div className="input-icon">
          <input placeholder="dd-mm-yyyy" type="date" />
          <FaCalendarAlt />
        </div>
        <div className="input-icon">
          <input placeholder="--:--" type="time" />
          <FaClock />
        </div>
        <textarea placeholder="Notes (optional)" />
        <button className="add-reminder-btn" type="submit">Add Reminder</button>
      </form>
    </div>
  </>
);

const VaccinationPage = () => {
  const [showModal, setShowModal] = useState(false);

  // Example reminders array
  const reminders = [
    {
      name: "asdfgh",
      date: "Feb 12, 2026",
      time: "23:14",
      status: "pending",
    },
    {
      name: "asdfgh",
      date: "Feb 12, 2026",
      time: "23:14",
      status: "pending",
    },
    {
      name: "asdfgh",
      date: "Feb 12, 2026",
      time: "23:14",
      status: "pending",
    },
  ];

  return (
    <div className="vaccination-container">
      <div className="vaccination-header">
        <button className="back-btn" onClick={() => window.history.back()}>
          <FaArrowLeft />
        </button>
        <h2>Vaccination</h2>
        <div style={{ flex: 1 }} />
        <div className="add-btn" onClick={() => setShowModal(true)}>
          <span>+</span>
        </div>
      </div>
      <div className="vaccination-content">
        {reminders.length === 0 ? (
          <>
            <FaBell className="vaccination-icon" />
            <div className="vaccination-text">No vaccination reminders</div>
          </>
        ) : (
          <div className="reminders-list">
            {reminders.map((reminder, idx) => (
              <div className="reminder-card" key={idx}>
                <div className="reminder-row">
                  <div className="reminder-name">{reminder.name}</div>
                  <div className="reminder-status">{reminder.status}</div>
                </div>
                <div className="reminder-details">
                  <div>
                    <FaCalendarAlt /> {reminder.date}
                  </div>
                  <div>
                    <FaClock /> {reminder.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {showModal && <AddVaccinationModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default VaccinationPage;