import { Route, Routes, BrowserRouter } from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import Dashboard from "./pages/Dashboard";
import ReportPage from "./pages/ReportPage";
import ProfilePage from "./pages/ProfilePage";
import PetProfilePage from "./pages/PetProfilePage";
import OtpPage from "./components/auth/OtpPage";
import HealthRecordPage from "./pages/HealthRecordPage";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
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
        {/* <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile/pets/:petId" element={<PetProfilePage />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/community" element={<CommunityPage />} /> */}
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
