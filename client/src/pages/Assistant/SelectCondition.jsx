import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProgressIndicator from "../../components/ProgressIndicator";
import DiseaseIcon from "../../assets/icons/disease.svg";
import WoundIcon from "../../assets/icons/wound.svg";

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
  font-family: Pretendard;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
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
const Options = styled.div`
  display: flex;
  justify-content: center;
  gap: 9px;
  width: 100%;
  margin-bottom: 20px;
`;

const Option = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 172px;
  height: 205px;
  padding: 31px 48px;
  gap: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  background-color: ${(props) =>
    props.selected ? "rgba(255, 249, 119, 0.40)" : "#F8F8F8"};
  margin-left: ${(props) => (props.left ? "20px" : "0")};
  margin-right: ${(props) => (props.right ? "20px" : "0")};
`;

const Icon = styled.img`
  width: 74px;
  height: 143px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 11px;
  width: 100%;
  padding: 0 20px;
  margin-top: auto;
  margin-bottom: 25px;
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
  margin-top: 155px;
`;

function SelectCondition() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const handleSelect = (condition) => {
    setSelected(condition);
  };

  const handleNext = () => {
    if (selected === "disease") {
      navigate("/select-insurance-type-d");
    } else if (selected === "wound") {
      navigate("/select-insurance-type-w");
    }
  };

  // 조건 변수 정의
  const condition = selected;

  return (
    <PageContainer>
      <Container>
        <ProgressIndicator step={3} />
        <Title>어떤 보험 청구가 필요하신가요?</Title>
        <Subtitle>
          조건을 선택해주시면 청구 시 필요한 서류를 안내해드릴게요
        </Subtitle>
        <Options>
          <Option
            selected={selected === "disease"}
            onClick={() => handleSelect("disease")}
            left
          >
            <Icon src={DiseaseIcon} alt="질병" />
          </Option>
          <Option
            selected={selected === "wound"}
            onClick={() => handleSelect("wound")}
            right
          >
            <Icon src={WoundIcon} alt="상해" />
          </Option>
        </Options>
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

export default SelectCondition;
