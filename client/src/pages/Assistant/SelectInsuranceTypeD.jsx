import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import ProgressIndicator from "../../components/ProgressIndicator";
import axios from "axios";

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  background: #fafafa;
  overflow-y: auto;

`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 393px;
  height: 792px;
  margin: 0;
  background: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding-bottom: 95px;
`;

const Title = styled.h1`
  font-family: Pretendard;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: left;
  line-height: 1.5;
  align-self: flex-start;
  margin-left: 20px;
  margin-top: 51px;
`;

const Subtitle = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: -0.439px;
  margin-bottom: 40px;
  margin-left: 20px;
  align-self: flex-start;
`;

const SpecialtyContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 10px;
  margin-bottom: 20px;
  width: 90%;
  margin-left: 20px;
`;

const Specialty = styled.button`
  font-family: Pretendard;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: ${(props) => (props.selected ? "bold" : "normal")};
  color: #000000;
  background-color: ${(props) =>
    props.selected ? "rgba(255, 249, 119, 0.40)" : "#F8F8F8"};
  border: ${(props) =>
    props.selected ? "1px solid var(--pointyellow, #FFF977)" : "none"};
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 11px;
  width: 100%;
  padding: 0 20px;
  margin-top: 20px;
  margin-bottom: 25px;
`;

const Button = styled.button`
  font-family: Pretendard;
  width: 171px;
  height: 51px;
  padding: 10px 20px;
  font-size: 16px;
  color: ${(props) => (props.primary ? "#FFFFFF" : "#000000")};
  background-color: ${(props) => (props.primary ? "#4A7DFF" : "#F8F8F8")};
  border: none;
  border-radius: 16px;
  cursor: pointer;
  margin-top: 320px;
`;

const insuranceTypes = ["입원", "통원", "후유장해", "수술", "진단"];

function SelectInsuranceTypeD() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    facility,
    hospital_type,
    //recommended_hospitals,
    symptom_type,
    symptom_etc,
    symptom_start,
    symptom_freq,
    illness_etc,
    medicine_etc,
    etc,
    ins_req1
  } = location.state || {};
  const [selected, setSelected] = useState(null);

  const handleSelect = (type) => {
    setSelected(type);
  };

  const handleNext = async () => {
    const userId = localStorage.getItem("userId"); 
    if (selected) {
      const stateToPass1 = {
        facility,
        hospital_type, // 병원 유형
        symptom_type, // 선택된 증상들
        symptom_etc, // 사용자 입력 증상
        symptom_start, // 증상 시작 기간
        symptom_freq, // 증상 지속 기간
        illness_etc, // 만성 질환
        medicine_etc, // 현재 복용 중인 약
        etc, // 추가 정보
        ins_req1, // 질병 또는 상해
        ins_req2: selected, // 선택된 보험 유형
        hospital_fee: "3만원 미만", // 예를 들어 선택된 병원비
        disease_detail: "암", // 예를 들어 선택된 질병 세부 사항
        document: "",
      };
  
      const stateToPass2 = {
        facility,
        hospital_type, // 병원 유형
        symptom_type, // 선택된 증상들
        symptom_etc, // 사용자 입력 증상
        symptom_start, // 증상 시작 기간
        symptom_freq, // 증상 지속 기간
        illness_etc, // 만성 질환
        medicine_etc, // 현재 복용 중인 약
        etc, // 추가 정보
        ins_req1, // 질병 또는 상해
        ins_req2: selected, // 선택된 보험 유형
      };
  
      switch (selected) {
        case "입원":
        case "후유장해":
        case "수술":
          try {
            // POST 요청 보내기
            const response = await axios.post("https://minsi.pythonanywhere.com/medicarrier/assist/", 
              { user: userId, ...stateToPass1 }, {
              headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`, 
                "Content-Type": "application/json",
              },
            });
  
            if (response.status === 201) {
              navigate("/document-guide", { state: stateToPass1 });
            } else {
              console.error("Failed to save data:", response.statusText);
            }
          } catch (error) {
            console.error("Error saving data:", error.response ? error.response.data : error.message);
          }
          break;
        case "통원":
          navigate("/select-paid", { state: stateToPass1 });
          break;
        case "진단":
          navigate("/select-claim", { state: stateToPass2 });
          break;
        default:
          break;
      }
    }
  };



  return (
    <PageContainer>
      <Container>
        <ProgressIndicator step={3} />
        <Title>어떤 보험 청구가 필요하신가요?</Title>
        <Subtitle>
          조건을 선택해주시면 청구 시 필요한 서류를 안내해드릴게요
        </Subtitle>
        <SpecialtyContainer>
          {insuranceTypes.slice(0, 2).map((type, index) => (
            <Specialty
              key={index}
              selected={selected === type}
              onClick={() => handleSelect(type)}
            >
              {type}
            </Specialty>
          ))}
        </SpecialtyContainer>
        <SpecialtyContainer>
          {insuranceTypes.slice(2).map((type, index) => (
            <Specialty
              key={index}
              selected={selected === type}
              onClick={() => handleSelect(type)}
            >
              {type}
            </Specialty>
          ))}
        </SpecialtyContainer>
        <ButtonContainer>
          <Button onClick={() => navigate(-1)} primary={false}>
            이전
          </Button>
          <Button onClick={handleNext} primary={true} disabled={!selected}>
            다음
          </Button>
        </ButtonContainer>
      </Container>
    </PageContainer>
  );
}

export default SelectInsuranceTypeD;
