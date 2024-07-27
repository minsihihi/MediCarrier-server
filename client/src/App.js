import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, Router } from "react-router-dom";
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

import SelectFacility from "./pages/Assistant/SelectFacility";
import MapPharmacyView from "./pages/Assistant/MapPharmacyView";
import SymptomForm from "./pages/Assistant/SymptomForm";
import SymptomScript from "./pages/Assistant/SymptomScript";
import LocalScript from "./pages/Assistant/LocalScript";
import SelectSpecialty from "./pages/Assistant/SelectSpecialty";
import MapHospitalView from "./pages/Assistant/MapHospitalView";
import SelectCondition from "./pages/Assistant/SelectCondition";
import SelectInsuranceTypeD from "./pages/Assistant/SelectInsuranceTypeD";
import SelectInsuranceTypeW from "./pages/Assistant/SelectInsuranceTypeW";
import DocumentGuide from "./pages/Assistant/DocumentGuide";
import SelectPaid from "./pages/Assistant/SelectPaid";
import SelectClaim from "./pages/Assistant/SelectClaim"; // SelectClaim 추가
import NavBar from "./components/NavBar";
import "./App.css";

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
        <Routes>
        <Route path="/" element={<SelectFacility />} />
        <Route path="/map-pharmacy" element={<MapPharmacyView />} />
        <Route path="/symptom-form" element={<SymptomForm />} />
        <Route path="/symptom-script" element={<SymptomScript />} />
        <Route path="/local-script" element={<LocalScript />} />
        <Route path="/select-specialty" element={<SelectSpecialty />} />
        <Route path="/map-hospital" element={<MapHospitalView />} />
        <Route path="/select-condition" element={<SelectCondition />} />
        <Route
          path="/select-insurance-type-d"
          element={<SelectInsuranceTypeD />}
        />
        <Route
          path="/select-insurance-type-w"
          element={<SelectInsuranceTypeW />}
        />
        <Route path="/document-guide" element={<DocumentGuide />} />
        <Route path="/select-paid" element={<SelectPaid />} />
        <Route path="/select-claim" element={<SelectClaim />} />{" "}
      </Routes>
      <NavBar />
      </Routes>
    </BrowserRouter>



  );
}

export default App;
