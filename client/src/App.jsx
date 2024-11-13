import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import LandingPage from "./pages/LandingPage";
import LoginPage from "./components/auth/LoginPage";
import Dashboard from "./pages/Dashboard";
import ReportPage from "./pages/ReportPage";
import ProfilePage from "./pages/ProfilePage";
import PetProfilePage from "./pages/PetProfilePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reports" element={<ReportPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/pets" element={<PetProfilePage />} />
        {/* <Route exact path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile/pets/:petId" element={<PetProfilePage />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/community" element={<CommunityPage />} /> */}
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
