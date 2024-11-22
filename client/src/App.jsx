import { Route, Routes, BrowserRouter } from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import Dashboard from "./pages/Dashboard";
import ReportPage from "./pages/ReportPage";
import ProfilePage from "./pages/ProfilePage";
import PetProfilePage from "./pages/PetProfilePage";
import OtpPage from "./components/auth/OtpPage";
import HealthRecordPage from "./pages/HealthRecordPage";
import LandingPage from "./pages/LandingPage";
import { Toaster } from "sonner";
import NotFoundPage from "./pages/NotFound";
import ChartComponent from "./components/dashboard/ChartComponent";
import userPetContext from "./context/UserPetContext";
import userContext from "./context/UserContext";
import { useState } from "react";
import VaccinationPage from "./pages/VaccinationPage";
import Chatbot from "./components/dashboard/Chatbot";

function App() {
  const [userData, setUserData] = useState();
  const [pets, setPets] = useState([]);
  return (
    <>
      <userPetContext.Provider value={{ pets, setPets }}>
        <userContext.Provider value={{ userData, setUserData }}>
          <BrowserRouter
            future={{
              v7_startTransition: true,
            }}
          >
            <Routes>
              <Route exact path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/reports" element={<ReportPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/pets" element={<PetProfilePage />} />
              <Route path="/otp" element={<OtpPage />} />
              <Route path="/record" element={<HealthRecordPage />} />
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/chart" element={<ChartComponent />} />
              <Route path="/vaccination" element={<VaccinationPage />} />
            </Routes>
          </BrowserRouter>
        </userContext.Provider>
      </userPetContext.Provider>
      <Toaster />
      <Chatbot />
    </>
  );
}

export default App;
