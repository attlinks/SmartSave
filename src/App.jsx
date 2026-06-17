import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Smartinfo from "./components/Smartinfo";
import Prelogin from "./pages/Prelogin";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Prelogin />} />
    </Routes>
  </BrowserRouter>
);

export default App;
