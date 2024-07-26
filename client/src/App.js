import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import SetCountry from "./pages/SetCountry";
import SetDate from "./pages/SetDate";
import Login from './pages/Login';
import Signup from './pages/Signup';

import InsFeature from "./pages/InsFeature";
import InsStep from "./pages/InsStep";
import InsChecklist from "./pages/InsChecklist";
import InsContact from "./pages/InsContact";
import AssistRecord from "./pages/AssistRecord";

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
        <Route path="/medicarrier/register.trip" element={<SetCountry />} />
        <Route path="/medicarrier/register.trip.date" element={<SetDate />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/register.trip" element={<SetCountry />} />
        <Route path="/register.trip.date" element={<SetDate />} />

        {/* 어시스트 이용 기록 */}
        <Route path="/assist.record" element={<AssistRecord />} />

        {/* 보험 알아보기 */}
        <Route path="/insurance.feature" element={<InsFeature />} />
        <Route path="/insurance.step" element={<InsStep />} />
        <Route path="/insurance.checklist" element={<InsChecklist />} />
        <Route path="/insurance.contact" element={<InsContact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
