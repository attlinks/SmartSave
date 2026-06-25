import { BrowserRouter, Routes, Route } from "react-router-dom";
import PreLogin from "./pages/PreLogin";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
// import Overview from "./pages/Dashboard/Overview";
import Summary from "./pages/Dashboard/Summary";
import Creategoal from "./pages/Dashboard/Creategoal";
import Goals from "./pages/Dashboard/Goals";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PreLogin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboardlayout" element={<DashboardLayout />}>
          <Route index element={<Summary />} />
          <Route path="goals" element={<Goals />} />
          <Route path="creategoal" element={<Creategoal />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
