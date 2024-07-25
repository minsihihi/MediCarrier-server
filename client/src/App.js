import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import SetCountry from "./pages/SetCountry";
import SetDate from "./pages/SetDate";
import InsContact from "./pages/InsContact";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // pathname이 변경될 때마다 실행

  return null; // 이 컴포넌트는 UI를 렌더링하지 않음
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* 여행 등록 */}
        <Route path="/" element={<Home />} />
        <Route path="/register.trip" element={<SetCountry />} />
        <Route path="/register.trip.date" element={<SetDate />} />

        {/* 보험 알아보기 */}
        <Route path="/insurance.contact" element={<InsContact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
