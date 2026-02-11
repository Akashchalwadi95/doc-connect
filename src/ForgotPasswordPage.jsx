import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase"; // Make sure this is exported from your firebase.js
import { sendPasswordResetEmail } from "firebase/auth";
import './ForgotPasswordPage.css'

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");   

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset link sent! Check your email.");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="page">
      <div className="card">
        {/* Back link */}
        <div className="back" onClick={() => navigate("/")}>
          ← <span>Back to sign in</span>
        </div>

        {/* Title */}
        <h1>Reset your password</h1>
        <p className="subtitle">
          Enter your email and we'll send you a link to reset your password
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <div className="input-wrapper">
            <span className="icon">✉️</span>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button className="reset-btn" type="submit">Send reset link</button>
        </form>
        {message && <div style={{ marginTop: 16, color: "#0f172a" }}>{message}</div>}
      </div>
    </div>
  )
}
