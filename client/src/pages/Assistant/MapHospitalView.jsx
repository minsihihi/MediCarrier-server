import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProgressIndicator from "../../components/ProgressIndicator";

function MapHospitalView() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/symptom-form");
  };

  return (
    <PageContainer>
      <Container>
        <ProgressIndicator step={1} />
        <Title>
          병원을 추천해드릴게요
          <br />
          이용하실 병원을 선택해 주세요
        </Title>
        <Subtitle>
          추천된 병원은 구글맵 기준 병원, 후기가 좋은 병원들이에요
        </Subtitle>
        <MapContainer>{/* 여기에 구글맵 API를 추가...?? */}</MapContainer>
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

export default MapHospitalView;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #fafafa;
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 11px;
  width: 100%;
  padding: 0 20px;
  position: absolute;
  bottom: 80px;
`;

const Button = styled.button`
  width: 171px;
  height: 51px;
  padding: 10px 20px;
  font-size: 18px;
  color: ${(props) => (props.primary ? "#FFFFFF" : "#000000")};
  background-color: ${(props) => (props.primary ? "#4A7DFF" : "#F8F8F8")};
  border: none;
  border-radius: 16px;
  cursor: pointer;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  background-color: #e0e0e0;
`;
