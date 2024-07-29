import React, { useState } from "react";
import { useNavigate, useLocation} from "react-router-dom";
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
  margin-top: 266px;
`;

const claimTypes = ["암", "뇌질환", "심질환", "기타"];

function SelectClaim() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    facility,
    hospital_type,
    symptom_type,
    symptom_etc,
    symptom_start,
    symptom_freq,
    illness_etc,
    medicine_etc,
    etc,
    ins_req1,
    ins_req2,
  } = location.state || {};
  const [selected, setSelected] = useState(null);

  const handleSelect = (type) => {
    setSelected(type);
  };

  const handleNext = async () => {
    const userId = localStorage.getItem("userId");
    if (selected) {
      try {
        // POST 요청 보내기
        const response = await axios.post(
          "http://127.0.0.1:8000/medicarrier/assist/",
          {
            user: userId,
            facility,
            hospital_type,
            symptom_type,
            symptom_etc,
            symptom_start,
            symptom_freq,
            illness_etc,
            medicine_etc,
            etc,
            ins_req1,
            ins_req2,
            hospital_fee: "3만원 미만",
            disease_detail: selected,
            document: "",
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 201) {
          // 성공적으로 데이터가 저장된 경우
          navigate("/document-guide", {
            state: {
              user: userId,
              facility,
              hospital_type,
              symptom_type,
              symptom_etc,
              symptom_start,
              symptom_freq,
              illness_etc,
              medicine_etc,
              etc,
              ins_req1,
              ins_req2,
              hospital_fee: "3만원 미만",
              disease_detail: selected,
              document: "",
            }
          });
        } else {
          console.error("Failed to save data:", response.statusText);
        }
      } catch (error) {
        console.error("Error saving data:", error.response ? error.response.data : error.message);
      }
    }
  };

  // 클레임 타입 변수 정의
  const claim_type = selected;

  return (
    <PageContainer>
      <Container>
        <ProgressIndicator step={3} />
        <Title>조건을 선택해주세요</Title>
        <Subtitle>선택하신 조건에 따라 필요한 서류가 달라져요</Subtitle>
        <SpecialtyContainer>
          {claimTypes.map((type, index) => (
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

export default SelectClaim;
