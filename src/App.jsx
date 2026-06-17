import React from "react";
import {BrowserRouter, Routes, Route } from "react-router-dom";
import PreLogin from "./pages/PreLogin";
import Signup from "./pages/Signup";
import signupinfo from "./components/Signupinfo";
import Login from "./pages/Login";

const App = () => {
  return (
  
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PreLogin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
);
};

export default App;