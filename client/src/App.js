import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SetCountry from "./pages/SetCountry";
import SetDate from "./pages/SetDate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register.trip" element={<SetCountry />} />
        <Route path="/register.trip.date" element={<SetDate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
