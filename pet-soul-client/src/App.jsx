import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import PetProfilePage from "./pages/PetProfilePage";
import DiscoverPage from "./pages/DiscoverPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/profile/pets" component={ManagePetsPage} />
        <Route path="/profile/pets/:petId" component={PetProfilePage} />
        <Route
          path="/profile/pets/:petId/reports/new"
          component={AddReportPage}
        />
        <Route path="/discover" component={DiscoverPage} />
        <Route path="/health-corner" component={HealthCornerPage} />
        <Route path="/community" component={CommunityPage} />
      </Switch>
      <Footer />
    </Router>
  );
}
