import { Routes, Route, useNavigate } from "react-router-dom";
import ForgotPasswordPage from "./authentication/ForgotPasswordPage";
import CreateAccountPage from "./authentication/CreateAccountPage";
import Home from "./pages/home";
import CallDoctorPage from "./pages/CallDoctorPage";
import DoctorProfilePage from "./pages/DoctorProfilePage";
import BookAppointmentPage from "./pages/BookAppointmentPage";
import MedicalRecordsPage from "./pages/MedicalRecords/MedicalRecordsPage"; 
import AppointmentsPage from "./pages/Appointments/AppointmentsPage";
import VaccinationPage from "./pages/Vaccination/vaccinationPage";
import HelpDeskPage from "./pages/HelpDesk/HelpDeskPage";
import HealthAssistantPage from "./pages/HealthAssistant/HealthAssistantPage";
import SettingsPage from "./pages/Settings/SettingsPage";
import SignInPage from "./authentication/SignInPage";
import './App.css'

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
      <Route path="/book-appointment" element={<BookAppointmentPage />} />
      <Route path="/medical-records" element={<MedicalRecordsPage />} />
      <Route path="/appointments" element={<AppointmentsPage />} />
      <Route path="/vaccination" element={<VaccinationPage />} />
      <Route path="/help-desk" element={<HelpDeskPage />} /> 
      <Route path="/health-assistant" element={<HealthAssistantPage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  );
}
