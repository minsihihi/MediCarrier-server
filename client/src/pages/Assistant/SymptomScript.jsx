import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProgressIndicator from "../../components/ProgressIndicator";

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #fafafa;
  overflow: hidden;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 393px;
  height: 100%;
  margin: 0;
  background: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding-bottom: 95px;
  overflow: hidden;
`;

const Title = styled.h1`
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

const ScriptText = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  line-height: 1.6;
  margin-left: 20px;
  margin-right: 20px;
  flex-grow: 1;
`;

const HighlightedText = styled.span`
  color: #4a7dff;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 11px;
  width: 100%;
  padding: 0 20px;
  position: absolute;
  bottom: 100px;
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

function SymptomScript() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    symptoms = [],
    customSymptom,
    startDate,
    frequency,
    chronicDiseases,
    medications,
    additionalInfo,
  } = location.state || {};

  const handleNext = () => {
    navigate("/local-script");
  };

  const chronicDiseasesText = chronicDiseases ? chronicDiseases : "없고";
  const medicationsText = medications ? medications : "없습니다";
  const symptomsText =
    symptoms.length > 0 && customSymptom
      ? `${symptoms.join(", ")} 및 ${customSymptom}`
      : symptoms.length > 0
      ? symptoms.join(", ")
      : customSymptom
      ? customSymptom
      : "증상이 없습니다";

  return (
    <PageContainer>
      <Container>
        <ProgressIndicator step={2} />
        <Title>
          입력해주신 정보를 바탕으로
          <br />
          스크립트를 작성했어요!
        </Title>
        <Subtitle>수정할 부분이 있다면 이전 버튼을 눌러 수정해주세요</Subtitle>
        <ScriptText>
          안녕하세요. 저는 <HighlightedText>한국인 관광객</HighlightedText>
          입니다.
          <br />
          <br />
          저는 <HighlightedText>{startDate}</HighlightedText>부터{" "}
          <HighlightedText>{frequency}</HighlightedText>으로{" "}
          <HighlightedText>{symptomsText}</HighlightedText>.
          <br />
          최근 앓았던 질병이나 현재 앓고 있는 만성 질환은{" "}
          <HighlightedText>{chronicDiseasesText}</HighlightedText>, 현재
          복용하고 있는 약은{" "}
          <HighlightedText>{medicationsText}</HighlightedText>
          {additionalInfo && (
            <>
              .
              <br />
              {additionalInfo}
            </>
          )}
          .
        </ScriptText>
        <ButtonContainer>
          <Button onClick={() => navigate(-1)} primary={false}>
            이전
          </Button>
          <Button onClick={handleNext} primary={true}>
            다음
          </Button>
        </ButtonContainer>
      </Container>
    </PageContainer>
  );
}

export default SymptomScript;
