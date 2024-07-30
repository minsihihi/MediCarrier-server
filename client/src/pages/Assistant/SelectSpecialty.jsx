import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import ProgressIndicator from "../../components/ProgressIndicator";

const specialties = [
  "내과",
  "외과",
  "정형외과",
  "이비인후과",
  "응급실",
  "산부인과",
  "피부과",
  "치과",
  "안과",
  "비뇨기과",
  "신경외과",
  "항문외과",
  "성형외과",
  "정신건강의학과",
];

function SelectSpecialty() {
  const navigate = useNavigate();
  const location = useLocation();
  const { facility } = location.state || {};
  const [selected, setSelected] = useState(null);
  const [showMore, setShowMore] = useState(false);

  const handleSelect = (specialty) => {
    setSelected(specialty);
  };

  const handleNext = () => {
    if (selected) {
      navigate("/map-hospital", { state: {facility, hospital_type: selected } });
    }
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <PageContainer>
      <Container>
        <ProgressIndicator step={1} />
        <Title>
          이용하실 병원의 진료 과목을
          <br />
          선택해주세요
        </Title>
        <Subtitle>
          산부인과, 항문외과, 비뇨기과, 피부과, 성형외과, 검사비용 등의 경우{" "}
          <br />
          추가 서류 제출이 요청될 수 있어요
        </Subtitle>
        <SpecialtyContainer expanded={showMore}>
          {specialties
            .slice(0, showMore ? specialties.length : 8)
            .map((specialty, index) => (
              <Specialty
                key={index}
                selected={selected === specialty}
                onClick={() => handleSelect(specialty)}
              >
                {specialty}
              </Specialty>
            ))}
          <MoreButton onClick={toggleShowMore}>
            {showMore ? "닫기 ↑" : "더보기 ↓"}
          </MoreButton>
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

export default SelectSpecialty;

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
  position: relative;
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
  margin-top: 8px;
  margin-left: 0px;
`;

const SpecialtyContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 10px;
  margin-bottom: 20px;
  width: 90%;
  margin-left: 20px;
  max-height: ${(props) => (props.expanded ? "auto" : "180px")}; /* 높이 조정 */
  overflow: hidden;
`;

const Specialty = styled.button`
  padding: 10px 20px;
  font-family: Pretendard;
  font-size: 16px;
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
`;

const MoreButton = styled(Specialty)`
  border: 1px solid rgba(226, 124, 61, 0.3);
  background: rgba(226, 124, 61, 0.09);
`;
