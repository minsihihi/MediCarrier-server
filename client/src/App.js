import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
