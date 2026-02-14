import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaCalendarAlt, FaClock } from "react-icons/fa";
import "./AppointmentsPage.css";
import { getFirestore, collection, doc, addDoc, getDoc, updateDoc, deleteDoc, getDocs } from "firebase/firestore";
import { app } from "../../firebase"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppointmentsPage = () => {

  const [appointments, setAppointments] = useState([]);

  useEffect(()=> {
    const fetchAppointments = async () => {
      const db = getFirestore(app);
      const snapshot = await getDocs(collection(db, "appointments"));
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAppointments(docs);
    };
    fetchAppointments();

  }, []);
  
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

      {appointments.length === 0 ? (
        <div>No appointments found.</div>
      ) : (
        appointments.map(appointment => (
          <div key={appointment.id} className="appointment-card">
            <div className="appointment-card-row">
              <div>
                <div className="appointment-name">{appointment.name}</div>
                <div className="appointment-doctor">{appointment.doctor || appointment.Name}</div>
              </div>
              <div className="appointment-status">{appointment.status || "pending"}</div>
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
        ))
      )}
    </div>
  );
};

export default AppointmentsPage;