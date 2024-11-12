import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
// import ProfilePage from "./pages/ProfilePage";
// import PetProfilePage from "./pages/PetProfilePage";
// import DiscoverPage from "./pages/DiscoverPage";
// import SignupPage from "./pages/SignupPage";
// import ManagePetsPage from "./pages/ManagePetsPage";
// import AddReportPage from "./pages/AddReportPage";
// import CommunityPage from "./pages/CommunityPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route exact path="/" element={<LandingPage />} /> */}
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/pets" element={<ManagePetsPage />} />
        <Route path="/profile/pets/:petId" element={<PetProfilePage />} />
        <Route
          path="/profile/pets/:petId/reports/new"
          element={<AddReportPage />}
        />
        <Route path="/discover" element={<DiscoverPage />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/community" element={<CommunityPage />} /> */}
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
