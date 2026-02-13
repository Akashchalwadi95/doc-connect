import React, { useState } from "react";
import { FaArrowLeft, FaPhoneAlt, FaExclamationTriangle, FaClock, FaPlus, FaTimes } from "react-icons/fa";
import "./home.css";
import "./CallDoctorPage.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {isValidEmail} from "../utils/Sanitization";
import { getFirestore, collection, doc, addDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { app } from "../firebase";

const AddDoctorModal = ({ onClose }) => {  
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [experience, setExperience] = useState("");
  const [fees, setFees] = useState("");
  const [address, setAddress] = useState("");
  const [languages, setLanguages] = useState([]);
  const [hours, setHours] = useState("");
  const [emergency, setEmergency] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const addDoctor = async (e) => { 
    e.preventDefault();
    console.log("reached add doctor function");

    if(!name || !specialty || !phone || !qualifications || !experience || !fees || !address || !startTime || !endTime) {
      toast.error("Please fill in all the fields.");
      return;
    }

    if(phone.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    if(email && !isValidEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (languages.length === 0) {
     toast.error("Please select at least one language.");
     return;
   }

    try {
    const db = getFirestore(app);
    console.log("Adding doctor to Firestore with data: ")
    await addDoc(collection(db, "doctors"), {
      name: name.trim(),
      specialty: specialty.trim(),
      phone: phone.trim(),
      email: email.trim(),
      qualifications: qualifications.trim(),
      experience,
      fees,
      address: address.trim(),
      languages: languages,
      hours: `${startTime} - ${endTime}`,
      emergency,
      createdAt: new Date()
    });
    console.log("Doctor added successfully to Firestore");
  }
  catch(error) {
    console.error("Error adding doctor: ", error);
    toast.error("Failed to add doctor. Please try again.");
    return;
  }

    toast.success("Doctor added successfully!");
    onClose();

  };
  
  return (
    <div className="modal-overlay">
    <div className="modal">
      <button className="modal-close" onClick={onClose}><FaTimes /></button>
      <h2>Add New Doctor</h2>
      <form className="add-doctor-form" onSubmit={addDoctor}>
        <label>
          Name *
          <input
            placeholder="Name *"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>

        <label>
          Specialty *
          <select value={specialty} onChange={e => setSpecialty(e.target.value)}>
            <option value="">Select Specialty </option>
            <option value="General Physician">General Physician</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="ENT">ENT</option>
            <option value="Pediatrician">Pediatrician</option>
            <option value="Gynecologist">Gynecologist</option>
            <option value="Orthopedic">Orthopedic</option>
            <option value="Dentist">Dentist</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label>
          Phone *
          <input
            placeholder="Phone Number"
            value={phone}
            onChange={e => setPhone(e.target.value.replace(/\D/g, ""))}
            maxLength={10}
          />
        </label>

        <label>
          Email *
          <input
            placeholder="Email Address"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </label>

        <label>
          Qualifications *
          <select value={qualifications} onChange={e => setQualifications(e.target.value)}>
            <option value="">Select Qualification </option>
            <option value="MBBS">MBBS</option>
            <option value="MD">MD</option>
            <option value="MS">MS</option>
            <option value="DM">DM</option>
            <option value="MCh">MCh</option>
            <option value="BDS">BDS</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label>
          Experience *
          <select value={experience} onChange={e => setExperience(e.target.value)}>
            <option value="">Select Years of Experience </option>
            {[...Array(41).keys()].slice(1).map(year => (
              <option key={year} value={year}>{year} {year === 1 ? "year" : "years"}</option>
            ))}
          </select>
        </label>

        <label>
          Consultation Fees (₹) *
          <input
            placeholder="100"
            value={fees}
            onChange={e => setFees(e.target.value.replace(/\D/g, ""))}
            maxLength={4}
          />
        </label>

        <label>
          Clinic Address *
          <textarea
            placeholder="Address"
            value={address}
            onChange={e => setAddress(e.target.value)}
            maxLength={100}
          />
        </label>

        <label> 
          Languages *
          <div style={{ display: "flex", gap: "16px", marginBottom: "12px", flexWrap: "wrap" }}>
            {["English", "Hindi", "Tamil", "Telugu", "Marathi", "Gujarati", "Bengali", "Kannada", "Malayalam", "Punjabi", "Urdu", "Other"].map(lang => (
              <label key={lang} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <input
                  type="checkbox"
                  value={lang}
                  checked={languages.includes(lang)}
                  onChange={e => {
                    if (e.target.checked) {
                      setLanguages([...languages, lang]);
                    } else {
                      setLanguages(languages.filter(l => l !== lang));
                    }
                  }}

                  style={{width: "20px", height: "20px"}}
                />
                {lang}
              </label>
            ))}
          </div>
        </label>

        <label>
          Available Hours *
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              type="time"
              value={startTime}
              onChange={e => setStartTime(e.target.value)}
            />
            <span>to</span>
            <input
              type="time"
              value={endTime}
              onChange={e => setEndTime(e.target.value)}
            />
          </div>
        </label>

        <div className="form-row">
          <label htmlFor="emergency-checkbox" style={{ marginRight: "10px", marginBottom: 0 }}>
            Available for Emergency ?
          </label>
          <input
            id="emergency-checkbox"
            type="checkbox"
            checked={emergency}
            onChange={e => setEmergency(e.target.checked)}
            style={{ width: "20px", height: "20px" }}
          />
        </div>

        <button className="add-doctor-btn" type="submit">Add Doctor</button>
      </form>
    </div>
    </div>
  );
};

const CallDoctorPage = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <ToastContainer /> 
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