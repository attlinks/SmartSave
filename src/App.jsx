import { BrowserRouter, Routes, Route } from "react-router-dom";
import Prelogin from "./pages/Prelogin.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import DashboardLayout from "./pages/Dashboard/DashboardLayout.jsx";
import RequireAuth from "./components/RequireAuth.jsx";

import Summary from "./pages/Dashboard/Summary.jsx";
import Creategoal from "./pages/Dashboard/Creategoal.jsx";
import Goals from "./pages/Dashboard/Goals.jsx";
import GoalDetail from "./pages/Dashboard/GoalDetail.jsx";
import Profiles from "./pages/Dashboard/Profiles.jsx";
import Notifications from "./pages/Dashboard/Notifications.jsx";
import Settings from "./pages/Dashboard/Settings.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Prelogin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <DashboardLayout />
            </RequireAuth>
          }
        >
          <Route index element={<Summary />} />
          <Route path="goals" element={<Goals />} />
          <Route path="creategoal" element={<Creategoal />} />
          <Route path="goal/:id" element={<GoalDetail />} />
          <Route path="profiles" element={<Profiles />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
