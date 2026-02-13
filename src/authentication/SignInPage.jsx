import React, { useState } from "react";
import { signInWithGoogle } from "../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";
import './SignInPage.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Add this import at the top

export default function SignInPage({ onForgotPassword, onSignUp, onSignIn }) {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      setUser(result.user);
      toast.success("Signed in with Google!");
      onSignIn();
    } catch (error) {
      toast.error(error.message || "Google sign-in failed.");
    }
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }
    try {
      const result = await signInWithEmailAndPassword(getAuth(app), email, password);
      setUser(result.user);
      toast.success("Signed in successfully!");
      onSignIn();
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        toast.error("No account found with this email.");
      } else if (error.code === "auth/wrong-password") {
        toast.error("Incorrect password.");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Invalid email format.");
      } else {
        toast.error("Invalid email or password.");
      }
    }
  };

  return (
    <div className="page">
      <ToastContainer />
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
        <form onSubmit={handleEmailSignIn}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <label>Password</label>
          <div className="input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value.replace(/\s/g, ""))} // removes all spaces
              autoComplete="current-password"
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword((prev) => !prev)}
              style={{ cursor: "pointer", marginLeft: 8 }}
              tabIndex={0}
              role="button"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

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