import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './CreateAccountPage.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isValidEmail, isStrongPassword } from "../utils/Sanitization";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "../firebase";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // <-- Add this

export default function CreateAccountPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirm) {
      toast.error("All fields are required!");
      return;
    }
    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!isStrongPassword(password)) {
      toast.error("Password must be at least 8 characters and include a number, special character, uppercase and lowercase letter.");
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords do not match.");
      return;
    }
    const auth = getAuth(app);
    const db = getFirestore(app);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // create user id for each user
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: new Date()
      });

      toast.success("Account created successfully!");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("This email is already in use. Please try signing in or use a different email.");
      } 
      else { 
          toast.error("Failed to create account. Please try again."); 
      }

      console.error("Error creating account:", error);
      return;
    }
    navigate("/");
  };

  return (
    <div className="page">
      <ToastContainer />
      <div className="card">
        <div className="back" onClick={() => navigate("/")}> 
          ← <span>Back to sign in</span>
        </div>
        <h1>Create your account</h1>
        <form>
          <label>Email</label>
          <div className="input-wrapper">
            <span className="icon">✉️</span>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <label>Password</label>
          <div className="input-wrapper">
            <span className="icon">🔒</span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword((prev) => !prev)}
              style={{ cursor: "pointer", marginLeft: 8 }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <label>Confirm Password</label>
          <div className="input-wrapper">
            <span className="icon">🔒</span>
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
            />
            <span
              className="eye-icon"
              onClick={() => setShowConfirm((prev) => !prev)}
              style={{ cursor: "pointer", marginLeft: 8 }}
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button className="create-btn" onClick={handleSignIn}>Create account</button>
          <div className="signin-link" style={{ textAlign: "center", marginTop: "18px" }}>
            Already have an account?{" "}
            <span
              style={{ color: "#0f172a", fontWeight: 500, cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Sign in
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}
