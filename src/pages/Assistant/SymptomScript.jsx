import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProgressIndicator from "../../components/ProgressIndicator";

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
  padding-bottom: 95px; /* 패딩 조정 */
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: left;
  line-height: 1.5;
  align-self: flex-start; /* 왼쪽 정렬 */
  margin-left: 20px; /* 왼쪽 여백 추가 */
  margin-top: 150px; /* 상단바 공간 확보 */
`;

const Subtitle = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: -0.439px;
  margin-bottom: 40px; /* 텍스트와 버튼 사이의 간격 조정 */
  margin-left: 20px; /* 왼쪽 여백 추가 */
  align-self: flex-start; /* 왼쪽 정렬 */
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 11px;
  width: 100%;
  padding: 0 20px;
  position: absolute;
  bottom: 100px; /* 버튼을 하단에 고정 */
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

function SymptomScript() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/local-script");
  };

  return (
    <PageContainer>
      <Container>
        <ProgressIndicator step={3} />
        <Title>
          입력해주신 정보를 바탕으로
          <br />
          스크립트를 작성했어요!
        </Title>
        <Subtitle>수정할 부분이 있다면 이전 버튼을 눌러 수정해주세요</Subtitle>
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
