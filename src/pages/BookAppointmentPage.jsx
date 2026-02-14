import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaCalendarAlt, FaClock } from "react-icons/fa";
import "./BookAppointmentPage.css";
import { getFirestore, collection, doc, addDoc, getDoc, updateDoc, deleteDoc, getDocs } from "firebase/firestore";
import { app } from "../firebase"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
// import { appointFunctionality } from "../components/appointFunctionality";

const BookAppointmentPage = () => {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [notes, setNotes] = useState("");

  const [bookedTimes, setBookedTimes] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const db = getFirestore(app);
      const snapshot = await getDocs(collection(db, "doctors"));
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDoctors(docs);
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (!selectedDoctor || !appointmentDate) {
      setBookedTimes([]);
      return;
    }
    const fetchBookedTimes = async () => {
      const db = getFirestore(app);
      const q = collection(db, "appointments");
      const snapshot = await getDocs(q);
      const times = snapshot.docs
        .map(doc => doc.data())
        .filter(app => app.Name === selectedDoctor && app.date === formatDate(appointmentDate))
        .map(app => app.time);
      setBookedTimes(times);
    };
    fetchBookedTimes();
  }, [selectedDoctor, appointmentDate]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${day}-${month}-${year}`;
  };

  const generateTimeSlots = (start, end) => {
    const slots = [];
    let [startHour, startMin] = start.split(":").map(Number);
    let [endHour, endMin] = end.split(":").map(Number);

    let currentHour = startHour;
    let currentMin = startMin;

    while (
      currentHour < endHour ||
      (currentHour === endHour && currentMin <= endMin)
    ) {
      slots.push(
        `${currentHour.toString().padStart(2, "0")}:${currentMin
          .toString()
          .padStart(2, "0")}`
      );
      if (currentMin === 0) {
        currentMin = 30;
      } else {
        currentHour += 1;
        currentMin = 0;
      }
    }
    return slots;
  };

  const getDoctorHours = (doctor) => {
    if (!doctor || !doctor.hours) return { start: "09:00", end: "18:00" };
    const [start, end] = doctor.hours.split(" - ");
    return { start, end };
  };

  const appointFunctionality = async(e) => {
    e.preventDefault();
    console.log(" debugging ", selectedDoctor, appointmentDate, appointmentTime, notes);
    console.log("appointmentDate:", appointmentDate);
    console.log("appointmentTime:", appointmentTime);
    console.log("Combined:", `${appointmentDate}T${appointmentTime}`);
    if (!selectedDoctor || !appointmentDate || !appointmentTime) {
      toast.error("Please fill in all the fields.");
      return;
    }

    const [year, month, day] = appointmentDate.split("-");
    const [hour, minute] = appointmentTime.split(":");
    const appointment = new Date(year, month - 1, day, hour, minute);

    console.log("appointment:", appointment, "now:", new Date());
    console.log("appointment < now?", appointment < new Date());

    if (appointment < new Date()) {
      toast.error("Please select a future date and time.");
      return;
    }

    // Check if slot is already booked
    if (bookedTimes.includes(appointmentTime)) {
      toast.error("This time slot is already booked for the selected doctor and date.");
      return;
    }

    try {
      const db = getFirestore(app);
      const appointmentData = {
        Name: selectedDoctor.trim(),
        date: formatDate(appointmentDate),
        time: appointmentTime, 
        notes: notes.trim(),
        createdAt: new Date()
      };
      await addDoc(collection(db, "appointments"), appointmentData);
      toast.success("Appointment booked successfully!");
      setTimeout(() => {
        navigate("/appointments");
      }, 1500);
    }
    catch (error) {
      console.error("Error booking appointment: ", error);
      toast.error("Failed to book appointment. Please try again.");
    }
    

}
  

  

  return (
    <div className="book-appointment-container">
      <ToastContainer />
      <div className="book-appointment-header">
        <button className="back-btn" onClick={() => window.history.back()}>
          <FaArrowLeft />
        </button>
        <h2>Book Appointment</h2>
      </div>
      <form className="book-appointment-form" onSubmit={appointFunctionality}>
        <div className="form-group">
          <label>Select Doctor *</label>
          <select value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)} >
            <option value="">Select a Doctor</option>
            {doctors.map(doctor => (
              <option key={doctor.id}>{doctor.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Appointment Date *</label>
          <div className="input-icon">
            <FaCalendarAlt />
            <input
              type="date"
              value={appointmentDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setAppointmentDate(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Appointment Time *</label>
          <div className="input-icon">
            <FaClock />
            {(() => {
              const doctorObj = doctors.find(doc => doc.name === selectedDoctor);
              const { start, end } = getDoctorHours(doctorObj || {});
              return (
                <select value={appointmentTime} onChange={e => setAppointmentTime(e.target.value)}>
                  <option value="">Select a time</option>
                  {generateTimeSlots(start, end).map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              );
            })()}
          </div>
        </div>
        <div className="form-group">
          <label>Notes (Optional)</label>
          <textarea placeholder="Any specific concerns..." value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
        <button className="book-appointment-btn" type="submit">
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default BookAppointmentPage;