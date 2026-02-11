import React from "react";
import { FaArrowLeft, FaComments, FaCalendarAlt, FaFileMedical } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BottomNav from "../../components/BottomNav";
import "./HealthAssistantPage.css";

const HealthAssistantPage = () => {
  const navigate = useNavigate();

  return (
    <div className="assistant-container">
      <div className="assistant-header">
        <button className="back-btn" onClick={() => window.history.back()}>
          <FaArrowLeft />
        </button>
        <div>
          <h2>Health Assistant</h2>
          <div className="assistant-subtitle">AI-powered personalized guidance</div>
        </div>
      </div>
      <div className="assistant-banner">
        <span>
          <FaComments style={{ marginRight: 8 }} />
          I can access your medical history to provide personalized advice. Always consult healthcare professionals for serious concerns.
        </span>
      </div>
      <div className="assistant-actions-label">Quick Actions:</div>
      <div className="assistant-actions">
        <button className="assistant-action-btn" onClick={() => navigate("/book-appointment")}>
          <FaCalendarAlt style={{ marginRight: 6 }} />
          Book an appointment
        </button>
        <button className="assistant-action-btn" onClick={() => navigate("/medical-records")}>
          <FaFileMedical style={{ marginRight: 6 }} />
          View my medical records
        </button>
        <button className="assistant-action-btn">
          Summarize my health status
        </button>
      </div>
      <div className="assistant-chat">
        <div className="assistant-chat-label">AI Assistant</div>
        <div className="assistant-chat-bubble">
          Hello, Shadow. I’m your professional medical AI assistant. I have access to your medical history and am here to help you with any questions or assistance you may need. How can I assist you today?
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default HealthAssistantPage;