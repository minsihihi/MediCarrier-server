import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import ProgressIndicator from "../../components/ProgressIndicator";

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
  height: auto;
  margin: 0;
  background: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding-bottom: 95px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 0px;
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

const Section = styled.div`
  width: 100%;
  padding: 0 20px;
  margin-bottom: 12px;
`;

const SectionTitle = styled.h2`
  color: #646464;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.14px;
  margin-bottom: 10px;
  margin-left: 18px;
`;

const SymptomButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-left: 18px;
  margin-top: 15px;
`;

const SymptomButton = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  color: #000000;
  font-weight: ${(props) => (props.selected ? "bold" : "normal")};
  background-color: ${(props) =>
    props.selected ? "rgba(255, 249, 119, 0.40)" : "#F8F8F8"};
  border: ${(props) =>
    props.selected ? "1px solid var(--pointyellow, #FFF977)" : "none"};
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
`;

const Input = styled.input`
  width: 314px;
  padding: 20px;
  margin-top: 10px;
  margin-left: 18px;
  border: 1px solid #ccc;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
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
`;

const MoreButton = styled(SymptomButton)`
  border: 1px solid rgba(226, 124, 61, 0.3);
  background: rgba(226, 124, 61, 0.09);
`;

function SymptomForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { facility, hospital_type, 
    //recommended_hospitals 
  } = location.state || {};


  const [symptoms, setSymptoms] = useState([]); // 선택된 증상들
  const [customSymptom, setCustomSymptom] = useState(""); // 사용자 입력 증상
  const [startDate, setStartDate] = useState(null); // 증상 시작 기간
  const [frequency, setFrequency] = useState(null); // 증상 지속 기간
  const [chronicDiseases, setChronicDiseases] = useState(""); // 만성 질환
  const [medications, setMedications] = useState(""); // 현재 복용 중인 약
  const [additionalInfo, setAdditionalInfo] = useState(""); // 추가 정보

  const handleSymptomClick = (symptom) => {
    if (symptoms.includes(symptom)) {
      setSymptoms(symptoms.filter((s) => s !== symptom));
    } else {
      setSymptoms([...symptoms, symptom]);
    }
  };

  const handleNext = () => {
    if (symptoms.length === 0 && !customSymptom) {
      alert("증상을 입력해주세요.");
      return;
    }

    // 변수 정의
    const variables = {
      symptoms,
      customSymptom,
      startDate,
      frequency,
      chronicDiseases,
      medications,
      additionalInfo,
    };

    navigate("/symptom-script", {
      state: {
        facility, // 시설
        hospital_type, // 병원 유형
        //recommended_hospitals, // 추천 병원
        symptom_type : symptoms, // 선택된 증상들
        symptom_etc: customSymptom, // 사용자 입력 증상
        symptom_start : startDate, // 증상 시작 기간
        symptom_freq: frequency, // 증상 지속 기간
        illness_etc: chronicDiseases, // 만성 질환
        medicine_etc : medications, // 현재 복용 중인 약
        etc : additionalInfo // 추가 정보
      },
    });
  };

  return (
    <PageContainer>
      <Container>
        <ProgressIndicator step={2} />
        <Title>
          더 정확한 증상을 알려주세요
          <br />
          번역된 스크립트를 제공드릴게요
        </Title>
        <Subtitle>의료 시설 방문시 의료진에게 제시할 수 있어요</Subtitle>
        <Section>
          <SectionTitle>
            <span style={{ fontWeight: 400 }}>1-1. 해당하는 증상을</span>{" "}
            <span style={{ fontWeight: 700 }}>모두 선택해주세요.</span>
          </SectionTitle>
          <SymptomButtons>
            {[
              "콧물이 나요",
              "열이 나요",
              "인후통이 있어요",
              "귀가 아파요",
              "기침을 해요",
            ].map((symptom, index) => (
              <SymptomButton
                key={index}
                selected={symptoms.includes(symptom)}
                onClick={() => handleSymptomClick(symptom)}
              >
                {symptom}
              </SymptomButton>
            ))}
          </SymptomButtons>
        </Section>
        <Section>
          <SectionTitle>
            <span style={{ fontWeight: 400 }}>1-2. 해당하는 증상이 없다면</span>{" "}
            <span style={{ fontWeight: 700 }}>직접 입력해주세요.</span>
          </SectionTitle>
          <Input
            type="text"
            value={customSymptom}
            onChange={(e) => setCustomSymptom(e.target.value)}
            placeholder="ex) 근육통이 있어요"
          />
        </Section>
        <Section>
          <SectionTitle>2-1. 증상은 언제 시작됐나요?</SectionTitle>
          <SymptomButtons>
            {["오늘", "1일 전", "2-3일 전"].map((date, index) => (
              <SymptomButton
                key={index}
                selected={startDate === date}
                onClick={() => setStartDate(date)}
              >
                {date}
              </SymptomButton>
            ))}
          </SymptomButtons>
          <SymptomButtons>
            {["일주일 전", "일주일 이상"].map((date, index) => (
              <SymptomButton
                key={index}
                selected={startDate === date}
                onClick={() => setStartDate(date)}
              >
                {date}
              </SymptomButton>
            ))}
          </SymptomButtons>
        </Section>
        <Section>
          <SectionTitle>2-2. 증상이 얼마나 자주 발생하나요?</SectionTitle>
          <SymptomButtons>
            {["지속적", "간헐적", "특정 시간에만"].map((freq, index) => (
              <SymptomButton
                key={index}
                selected={frequency === freq}
                onClick={() => setFrequency(freq)}
              >
                {freq}
              </SymptomButton>
            ))}
          </SymptomButtons>
        </Section>
        <Section>
          <SectionTitle>
            3-1. 최근 앓았던 질병이나 현재 앓고 있는 만성 질환이 있나요?
          </SectionTitle>
          <Input
            type="text"
            value={chronicDiseases}
            onChange={(e) => setChronicDiseases(e.target.value)}
            placeholder="ex) 당뇨, 고혈압"
          />
        </Section>
        <Section>
          <SectionTitle>3-2. 현재 복용하고 있는 약이 있나요?</SectionTitle>
          <Input
            type="text"
            value={medications}
            onChange={(e) => setMedications(e.target.value)}
            placeholder="ex) 만성 알레르기 약"
          />
        </Section>
        <Section>
          <SectionTitle>
            4. 추가로 더 전달하고 싶은 말이 있다면 적어주세요
          </SectionTitle>
          <Input
            type="text"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            placeholder="추가 정보 입력"
          />
        </Section>
        <ButtonContainer>
          <Button onClick={() => navigate(-1)} primary={false}>
            이전
          </Button>
          <Button
            onClick={handleNext}
            primary={true}
            disabled={!startDate || !frequency}
          >
            다음
          </Button>
        </ButtonContainer>
      </Container>
    </PageContainer>
  );
}

export default SymptomForm;
