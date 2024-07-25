import React, { useState } from "react";
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
`;

const SpecialtyContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 10px;
  margin-bottom: 20px;
  width: 90%; /* 컨테이너 너비를 설정 */
  margin-left: 20px; /* 왼쪽 여백 추가 */
`;

const Specialty = styled.button`
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
  margin-top: 87px; /* 버튼 상단 여백 추가 */
`;

const MoreButton = styled(Specialty)`
  border: 1px solid rgba(226, 124, 61, 0.3);
  background: rgba(226, 124, 61, 0.09);
`;

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
  const [selected, setSelected] = useState(null);
  const [showMore, setShowMore] = useState(false);

  const handleSelect = (specialty) => {
    setSelected(specialty);
  };

  const handleNext = () => {
    navigate("/map-hospital");
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
          산부인과, 항문외과, 비뇨기과, 피부과, 성형외과, 검사비용 등의 경우
          추가 서류 제출이 요청될 수 있어요
        </Subtitle>
        <SpecialtyContainer>
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
            {showMore ? "접기 ↑" : "더보기 ↓"}
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
