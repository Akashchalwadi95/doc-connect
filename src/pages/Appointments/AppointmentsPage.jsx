import React from "react";
import { FaArrowLeft, FaCalendarAlt, FaClock } from "react-icons/fa";
import "./AppointmentsPage.css";

const AppointmentsPage = () => {
  // Example appointment data
  const appointment = {
    name: "Vada",
    doctor: "Pav",
    date: "Jan 14, 2026",
    time: "09:14",
    notes: "Need an ent surgeon",
    status: "pending",
  };

  return (
    <div className="appointments-container">
      <div className="appointments-header">
        <button className="back-btn" onClick={() => window.history.back()}>
          <FaArrowLeft />
        </button>
        <h2>My Appointments</h2>
      </div>
      <div className="appointment-card">
        <div className="appointment-card-row">
          <div>
            <div className="appointment-name">{appointment.name}</div>
            <div className="appointment-doctor">{appointment.doctor}</div>
          </div>
          <div className="appointment-status">{appointment.status}</div>
        </div>
        <div className="appointment-details">
          <div>
            <FaCalendarAlt /> {appointment.date}
          </div>
          <div>
            <FaClock /> {appointment.time}
          </div>
        </div>
        <div className="appointment-notes">{appointment.notes}</div>
      </div>
    </div>
  );
};

export default AppointmentsPage;