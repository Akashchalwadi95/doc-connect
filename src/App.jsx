import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithGoogle } from "./firebase";
import ForgotPasswordPage from "./ForgotPasswordPage";
import CreateAccountPage from "./CreateAccountPage";
import './App.css'

function SignInPage({ onForgotPassword, onSignUp }) {
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
        <form>
          <label>Email</label>
          <input type="email" placeholder="you@example.com" />

          <label>Password</label>
          <input type="password" placeholder="••••••••" />

          <button className="sign-in-btn">Sign in</button>
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
          />
        }
      />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/create-account" element={<CreateAccountPage />} />
    </Routes>
  );
}
