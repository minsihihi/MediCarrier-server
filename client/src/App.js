import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import OnBoarding from "./pages/Onboarding/OnBoarding";
import Login from "./pages/Onboarding/Login";
import Signup from "./pages/Onboarding/Signup";
import SignupSucces from "./pages/Onboarding/SignupSucces";
import Home from "./pages/Home/Home";
import SetCountry from "./pages/Home/SetCountry";
import SetDate from "./pages/Home/SetDate";
import InsFeature from "./pages/Home/InsFeature";
import InsStep from "./pages/Home/InsStep";
import InsChecklist from "./pages/Home/InsChecklist";
import InsContact from "./pages/Home/InsContact";
import AssistRecord from "./pages/Home/AssistRecord";
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
import SelectClaim from "./pages/Assistant/SelectClaim";
<<<<<<< HEAD
import NavBar from "./components/NavBar";
=======
import InputSearch from "./pages/Search/InputSearch";
import MapSearch from "./pages/Search/MapSearch";
import NavBar from "./components/NavBar";

>>>>>>> 6ad88bf29db11b3feaebe9a469ae621e031c47da
import "./App.css";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  const location = useLocation();
  const hideNavBarPaths = ["/", "/login", "/signup", "/signup.succes"];

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* 로그인/회원가입 */}
        <Route path="/" element={<OnBoarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup.succes" element={<SignupSucces />} />
        {/* 여행 등록 */}
        <Route path="/home" element={<Home />} />
        <Route path="/medicarrier/register.trip" element={<SetCountry />} />
        <Route path="/medicarrier/register.trip.date" element={<SetDate />} />
        <Route path="/register.trip" element={<SetCountry />} />
        <Route path="/register.trip.date" element={<SetDate />} />
        {/* 어시스트 이용 기록 */}
<<<<<<< HEAD
        <Route path="/assist.record" element={<AssistRecord />} />
=======
        <Route path="/script" element={<AssistRecord />} />
>>>>>>> 6ad88bf29db11b3feaebe9a469ae621e031c47da
        {/* 보험 알아보기 */}
        <Route path="/insurance.feature" element={<InsFeature />} />
        <Route path="/insurance.step" element={<InsStep />} />
        <Route path="/insurance.checklist" element={<InsChecklist />} />
        <Route path="/insurance.contact" element={<InsContact />} />
        {/* 어시스트 */}
        <Route path="/assist" element={<SelectFacility />} />
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
        <Route path="/select-claim" element={<SelectClaim />} />
<<<<<<< HEAD
=======
        {/* 검색 */}
        <Route path="/search" element={<InputSearch />} />
        <Route path="/search.map" element={<MapSearch />} />
>>>>>>> 6ad88bf29db11b3feaebe9a469ae621e031c47da
      </Routes>
      {!hideNavBarPaths.includes(location.pathname) && <NavBar />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
