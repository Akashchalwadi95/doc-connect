import { useNavigate } from "react-router-dom";
import './CreateAccountPage.css'

export default function CreateAccountPage() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="card">
        {/* Back link */}
        <div className="back" onClick={() => navigate("/")}>
          ← <span>Back to sign in</span>
        </div>

        {/* Title */}
        <h1>Create your account</h1>

        {/* Form */}
        <form>
          {/* Email */}
          <label>Email</label>
          <div className="input-wrapper">
            <span className="icon">✉️</span>
            <input type="email" placeholder="you@example.com" />
          </div>

          {/* Password */}
          <label>Password</label>
          <div className="input-wrapper">
            <span className="icon">🔒</span>
            <input type="password" placeholder="Min. 8 characters" />
          </div>

          {/* Confirm Password */}
          <label>Confirm Password</label>
          <div className="input-wrapper">
            <span className="icon">🔒</span>
            <input type="password" placeholder="Re-enter password" />
          </div>

          <button className="create-btn">Create account</button>
        </form>
      </div>
    </div>
  )
}
