import { BrowserRouter, Routes, Route } from "react-router-dom";
import PreLogin from "./pages/PreLogin";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import RequireAuth from "./components/RequireAuth";
// import Overview from "./pages/Dashboard/Overview";
import Summary from "./pages/Dashboard/Summary";
import Creategoal from "./pages/Dashboard/Creategoal";
import Goals from "./pages/Dashboard/Goals";
import GoalDetail from "./pages/Dashboard/GoalDetail";
import Profiles from "./pages/Dashboard/Profiles";
import Notifications from "./pages/Dashboard/Notifications";
import Settings from "./pages/Dashboard/Settings";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PreLogin />} />
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
