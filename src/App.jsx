import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithGoogle } from "./firebase";
import ForgotPasswordPage from "./ForgotPasswordPage";
import CreateAccountPage from "./CreateAccountPage";
import Home from "./pages/home";
import CallDoctorPage from "./pages/CallDoctorPage";
import DoctorProfilePage from "./pages/DoctorProfilePage";
import './App.css'

function SignInPage({ onForgotPassword, onSignUp, onSignIn }) {
  const [user, setUser] = useState(null);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      setUser(result.user);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="page">
      <div className="card">
        {/* Logo */}
        <div className="logo">
          <div className="logo-circle">❤️</div>
        </div>

        <h1>Welcome to CareConnect</h1>
        <p className="subtitle">Sign in to continue</p>

        {/* Google Button */}
        <button className="google-btn" onClick={handleGoogleSignIn}>
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
          />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="divider">
          <span>OR</span>
        </div>

        {/* Form */}
        <form
          onSubmit={e => {
            e.preventDefault();
            onSignIn();
          }}
        >
          <label>Email</label>
          <input type="email" placeholder="you@example.com" />

          <label>Password</label>
          <input type="password" placeholder="••••••••" />

          <button className="sign-in-btn" type="submit">Sign in</button>
        </form>

        {/* Footer links */}
        <div className="footer">
          <a href="#" onClick={onForgotPassword}>Forgot password?</a>
          <span>
              Need an account? <a href="#" onClick={(e) => { e.preventDefault(); onSignUp(); }}>Sign up</a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <SignInPage
            onForgotPassword={() => navigate("/forgot-password")}
            onSignUp={() => navigate("/create-account")}
            onSignIn={() => navigate("/home")}
          />
        }
      />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/create-account" element={<CreateAccountPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/call-doctor" element={<CallDoctorPage />} />
      <Route path="/doctor-profile" element={<DoctorProfilePage />} />
    </Routes>
  );
}
