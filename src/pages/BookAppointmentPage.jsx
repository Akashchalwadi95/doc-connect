import React from "react";
import { FaArrowLeft, FaCalendarAlt, FaClock } from "react-icons/fa";
import "./BookAppointmentPage.css";

const BookAppointmentPage = () => {
  return (
    <div className="book-appointment-container">
      <div className="book-appointment-header">
        <button className="back-btn" onClick={() => window.history.back()}>
          <FaArrowLeft />
        </button>
        <h2>Book Appointment</h2>
      </div>
      <form className="book-appointment-form">
        <div className="form-group">
          <label>Select Doctor</label>
          <select>
            <option>Choose a doctor</option>
            {/* Add doctor options here */}
          </select>
        </div>
        <div className="form-group">
          <label>Appointment Date</label>
          <div className="input-icon">
            <FaCalendarAlt />
            <input type="date" />
          </div>
        </div>
        <div className="form-group">
          <label>Appointment Time</label>
          <div className="input-icon">
            <FaClock />
            <input type="time" />
          </div>
        </div>
        <div className="form-group">
          <label>Notes (Optional)</label>
          <textarea placeholder="Any specific concerns..." />
        </div>
        <button className="book-appointment-btn" type="submit">
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default BookAppointmentPage;