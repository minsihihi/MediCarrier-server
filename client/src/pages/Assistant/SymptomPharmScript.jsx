import React, { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProgressIndicator from "../../components/ProgressIndicator";
import axios from "axios";
import useScriptStore from "../../assets/scriptStore";

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  background: #fafafa;
  overflow-y: auto;
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
  bottom: 60px;
  margin-left: 15px;
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

function SymptomPharmScript() {
  const navigate = useNavigate();
  const [translatedScript, setTranslatedScript] = useState("");
  const location = useLocation();
  const { setScriptComponents } = useScriptStore((state) => state);

  const {
    symptom_type,
    symptom_etc,
    symptom_start,
    symptom_freq,
    illness_etc,
    medicine_etc,
    etc,
  } = location.state || {};

  const chronicDiseasesText = illness_etc ? illness_etc : "없고";
  const medicationsText = medicine_etc ? medicine_etc : "없습니다";
  const symptomsText =
    symptom_type.length > 0
      ? symptom_type.join(", ")
      : symptom_etc
      ? symptom_etc
      : "증상이 없습니다";

  const scriptComponents = `
    안녕하세요. 저는 한국인 관광객 입니다.
    저는 ${symptom_start}부터 ${symptom_freq}으로 ${symptomsText}.
    최근 앓았던 질병이나 현재 앓고 있는 만성 질환은 ${chronicDiseasesText}이고, 현재 복용하고 있는 약은 ${medicationsText} 입니다.
    ${etc ? ` ${etc}` : ""}
  `;
  // Convert JSX to HTML string
  //const scriptComponentsString = ReactDOMServer.renderToStaticMarkup(scriptComponents);

  const handleNext = async () => {
    setScriptComponents(scriptComponents);
    try {
      const response = await axios.post(
        "https://minsi.pythonanywhere.com/medicarrier/script/",
        {
          script: scriptComponents,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // 인증 토큰 추가
          },
        }
      );

      if (response.status !== 200) {
        throw new Error(`Failed to save script: ${response.statusText}`);
      }

      const data = response.data;
      console.log("Script saved:", data);

      setTranslatedScript(data.translated_script);
      navigate("/local-pharm-script", {
        state: { translatedScript: data.translated_script },
      });
    } catch (error) {
      console.error(
        "Error saving script:",
        error.response ? error.response.data : error.message
      );
    }
  };

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
        <ScriptText>{scriptComponents}</ScriptText>
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

export default SymptomPharmScript;
