import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaBell, FaTimes, FaCalendarAlt, FaClock, FaPlus } from "react-icons/fa";
import "./vaccinationPage.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { app } from "../../firebase";

// Modal component for adding vaccination reminder
const AddVaccinationModal = ({ onClose, onAdded }) => {
  const [vaccineName, setVaccineName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const getCurrentTime = () => {
    const now = new Date();
    return now.toTimeString().slice(0, 5);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!vaccineName || !date || !time) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (date < today) {
      toast.error("Date cannot be in the past.");
      return;
    }

    if (date === today && time < getCurrentTime()) {
      toast.error("Time cannot be in the past.");
      return;
    }

    try {
      const db = getFirestore(app);
      await addDoc(collection(db, "vaccinationReminders"), {
        name: vaccineName,
        date,
        time,
        notes,
        status: "pending",
        createdAt: new Date(),
      });
      toast.success("Vaccination reminder added!");
      setTimeout(() => {
        onAdded(); // trigger refresh
        onClose();
      }, 1200);
    } catch (error) {
      toast.error("Failed to save reminder.");
    }
  };

  const minTime = date === today ? getCurrentTime() : undefined;

  return (
    <div className="modal-overlay">
      <ToastContainer />
      <div className="modal">
        <button className="modal-close" onClick={onClose}><FaTimes /></button>
        <h2>Add Vaccination Reminder</h2>
        <form className="add-vaccination-form" onSubmit={handleSubmit}>
          <label>
            Vaccine Name *
            <input
              placeholder="Vaccine Name"
              value={vaccineName}
              onChange={(e) => setVaccineName(e.target.value)}
            />
          </label>
          <label>
            Date *
            <div className="input-icon-wrapper">
              <input
                placeholder="dd-mm-yyyy"
                type="date"
                value={date}
                min={today}
                onChange={(e) => {
                  setDate(e.target.value);
                  setTime("");
                }}
              />
            </div>
          </label>
          <label>
            Time *
            <div className="input-icon-wrapper">
              <input
                placeholder="--:--"
                type="time"
                value={time}
                min={minTime}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </label>
          <label>
            Notes (optional)
            <textarea
              placeholder="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </label>
          <button className="add-reminder-btn" type="submit">Add Reminder</button>
        </form>
      </div>
    </div>
  );
};

const VaccinationPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [reminders, setReminders] = useState([]);

  const fetchReminders = async () => {
    const db = getFirestore(app);
    const snapshot = await getDocs(collection(db, "vaccinationReminders"));
    const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setReminders(docs);
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  return (
    <div className="vaccination-container">
      <div className="vaccination-header">
        <button className="back-btn" onClick={() => window.history.back()}>
          <FaArrowLeft />
        </button>
        <h2>Vaccination</h2>
        <div className="header-spacer" />
        <div className="add-btn" onClick={() => setShowModal(true)}>
          <FaPlus />
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
              <div className="reminder-card" key={reminder.id || idx}>
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
                {reminder.notes && (
                  <div className="reminder-notes">
                    <strong>Notes:</strong> {reminder.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {showModal && (
        <AddVaccinationModal
          onClose={() => setShowModal(false)}
          onAdded={fetchReminders}
        />
      )}
    </div>
  );
};

export default VaccinationPage;