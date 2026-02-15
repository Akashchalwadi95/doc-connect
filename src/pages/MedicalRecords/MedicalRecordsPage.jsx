import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaFileMedical, FaUpload, FaTimes, FaRegFileImage, FaFilePdf, FaDownload } from "react-icons/fa";
import BottomNav from "../../components/BottomNav";
import "./MedicalRecordsPage.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { app } from "../../firebase"; 

// Modal component for uploading medical record
const UploadMedicalRecordModal = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [fileName, setFileName] = useState("No file chosen");
  const [file, setFile] = useState(null);
  const [prescriptionDate, setPrescriptionDate] = useState("");
  const [description, setDescription] = useState("Prescription");

  // Get today's date in yyyy-mm-dd format for min attribute
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !prescriptionDate || !file) {
      toast.error("Please fill in all required fields and select a file.");
      return;
    }

    if (new Date(prescriptionDate) > new Date()) {
      toast.error("Prescription date cannot be in the future.");
      return;
    }

    if(file.size > 10 * 1024 * 1024) { // 10MB limit
      toast.error("File size exceeds 10MB limit.");
      return;
    }

    try {
      // --- Upload file to Firebase Storage (pseudo-code, implement as needed) ---
      // const storageRef = ...;
      // await uploadBytes(storageRef, file);
      // const fileUrl = await getDownloadURL(storageRef);

      // For demo, just use a local URL (remove this in production)
      const fileUrl = file.type.startsWith("image/") || file.type === "application/pdf"
        ? URL.createObjectURL(file)
        : "";
      
      const db = getFirestore(app);
      await addDoc(collection(db, "medicalRecords"), {
        title,
        description,
        prescriptionDate,
        fileName,
        fileUrl,
        createdAt: new Date()
      });
      toast.success("Medical record uploaded successfully!");
      setTimeout(() => {
        onClose();
      }, 1500);
    }
    catch (error) {
      toast.error("Failed to upload medical record.");
    }
  };
  
  return (
    <div className="modal-overlay">
      <ToastContainer/>
      <div className="modal">
        <button className="modal-close" onClick={onClose}><FaTimes /></button>
        <h2>Upload Medical Record</h2>
        <form className="upload-record-form" onSubmit={handleSubmit}>
          <label>
            Title *
            <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <label>
            Description
            <select value={description} onChange={(e) => setDescription(e.target.value)}>
              <option>Prescription</option>
              <option>Lab Report</option>
              <option>Discharge Summary</option>
              <option>Other</option>
            </select>
          </label>
          <label>
            Prescription Date *
            <input placeholder="dd-mm-yyyy" type="date" value={prescriptionDate} onChange={(e) => setPrescriptionDate(e.target.value)} min="1900-01-01" max={today} />
          </label>
          <label className="file-label">
            <b>Choose File</b>
            <input
              type="file"
              accept=".pdf, image/*"
              style={{ display: "none" }}
              onChange={e => {
                if (e.target.files.length > 0) {
                  setFileName(e.target.files[0].name);
                  setFile(e.target.files[0]);
                } else {
                  setFileName("No file chosen");
                  setFile(null);
                }
              }}
            />
          </label>
          <div className="file-info">{fileName}</div>
          <div className="file-note">
            <small>
              &#9432; Maximum file size: 10MB. Supported formats: PDF, JPG, PNG
            </small>
          </div>
          <button className="upload-btn" type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
};

const MedicalRecordsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedicalRecords = async () => {
      setLoading(true);
      const db = getFirestore(app);
      const snapshot = await getDocs(collection(db, "medicalRecords"));
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRecords(docs);
      setLoading(false);
    };
    fetchMedicalRecords();
  }, [showModal]);

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
      {loading ? (
        <div className="medical-records-content">Loading...</div>
      ) : records.length === 0 ? ( 
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
      ) : (
        <div className="medical-records-list">
          {records.map(record => (
            <div className="medical-record-card modern" key={record.id}>
              <div className="medical-record-card-header">
                <div className="medical-record-card-icon">
                  {record.fileUrl && record.fileUrl.match(/\.(jpeg|jpg|png|gif)$/i) ? (
                    <a href={record.fileUrl} target="_blank" rel="noopener noreferrer">
                      <img
                        src={record.fileUrl}
                        alt={record.title}
                        className="medical-record-thumb"
                      />
                    </a>
                  ) : record.fileName && record.fileName.endsWith(".pdf") ? (
                    <FaFilePdf size={32} color="#8b5cf6" />
                  ) : (
                    <FaRegFileImage size={32} color="#8b5cf6" />
                  )}
                </div>
                <div className="medical-record-card-info">
                  <div className="medical-record-title">{record.title}</div>
                  <div className="medical-record-type">{record.description}</div>
                </div>
                <div className="medical-record-date">
                  {record.prescriptionDate}
                </div>
              </div>
              <div className="medical-record-file-row">
                <span className="file-info">{record.fileName}</span>
                {record.fileUrl && (
                  <a
                    href={record.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="file-download-link"
                    title="View/Download"
                  >
                    <FaDownload />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      <BottomNav />
      {showModal && <UploadMedicalRecordModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default MedicalRecordsPage;