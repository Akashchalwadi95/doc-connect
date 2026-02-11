import React, { useState } from "react";
import { FaArrowLeft, FaPhoneAlt, FaExclamationCircle, FaCheckCircle } from "react-icons/fa";
import "./HelpDeskPage.css";

const faqData = [
  {
    question: "How do I book an appointment?",
    answer: "Go to Book Appointment, select doctor, date, and time, then submit.",
  },
  {
    question: "Can I cancel or reschedule an appointment?",
    answer: "Yes, visit My Appointments and select the appointment to cancel or reschedule.",
  },
  {
    question: "How do I upload medical records?",
    answer: "Go to Medical Records and click Upload First Record or the upload icon.",
  },
  {
    question: "What should I do in case of emergency?",
    answer: "Call the emergency number or use the SOS button for immediate help.",
  },
  {
    question: "How do vaccination reminders work?",
    answer: "Add reminders in the Vaccination section and receive notifications.",
  },
  {
    question: "Is my medical data secure?",
    answer: "Yes, your data is encrypted and securely stored.",
  },
];

const firstAidData = [
  { title: "Heart Attack", content: "Call emergency services immediately. Keep the person calm and loosen tight clothing." },
  { title: "Choking", content: "Perform the Heimlich maneuver if trained. Call emergency services if needed." },
  { title: "Severe Bleeding", content: "Apply pressure to the wound. Call emergency services." },
  { title: "Burns", content: "Cool the burn with running water. Cover with a clean cloth. Seek medical help for severe burns." },
];

const HelpDeskPage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [openAid, setOpenAid] = useState(null);

  return (
    <div className="helpdesk-container">
      <div className="helpdesk-header">
        <button className="back-btn" onClick={() => window.history.back()}>
          <FaArrowLeft />
        </button>
        <h2>Help Desk</h2>
      </div>
      <div className="emergency-section">
        <div className="emergency-alert">
          <FaExclamationCircle style={{ color: "#ef4444", marginRight: 8 }} />
          <span>Emergency</span>
        </div>
        <div className="emergency-desc">
          For immediate medical emergency, call:
        </div>
        <button className="emergency-call-btn">
          <FaPhoneAlt style={{ marginRight: 8 }} />
          Call 112
        </button>
      </div>
      <div className="faq-section">
        <div className="faq-title">Frequently Asked Questions</div>
        {faqData.map((item, idx) => (
          <div className="faq-card" key={idx}>
            <div className="faq-question" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
              <FaCheckCircle style={{ color: "#059669", marginRight: 8 }} />
              {item.question}
              <span style={{ marginLeft: "auto" }}>{openFaq === idx ? "▼" : "▲"}</span>
            </div>
            {openFaq === idx && <div className="faq-answer">{item.answer}</div>}
          </div>
        ))}
      </div>
      <div className="aid-section">
        <div className="aid-title">Emergency First Aid Guide</div>
        {firstAidData.map((item, idx) => (
          <div className="aid-card" key={idx}>
            <div className="aid-question" onClick={() => setOpenAid(openAid === idx ? null : idx)}>
              {item.title}
              <span style={{ marginLeft: "auto" }}>{openAid === idx ? "▼" : "▲"}</span>
            </div>
            {openAid === idx && <div className="aid-answer">{item.content}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpDeskPage;