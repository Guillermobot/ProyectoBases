import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainMenu from "./pages/MainMenu.jsx";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
      </Routes>
    </Router>
  );
}