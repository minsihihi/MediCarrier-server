import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useInsuranceStore from "../assets/insuranceStore";
import useTripStore from "../assets/tripStore";
import axios from "axios";

function InsuranceModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [clickedButtons, setClickedButtons] = useState({}); // 단계별 클릭된 버튼 상태
  const insuranceType = useTripStore((state) => state.insuranceType);
  const setInsuranceType = useTripStore((state) => state.setInsuranceType);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleNext = () => {
    if (step === 1 && answers[1] === 1) {
      setStep(3);
    } else {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handleSelectAnswer = (step, answer) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [step]: answer }));
    setClickedButtons((prev) => ({
      ...prev,
      [step]: answer,
    })); // 단계별 클릭된 버튼 업데이트

    if (step === 2) {
      setInsuranceType(answer); // insuranceType 설정
    }
  };

  const determineInsuranceType = () => {
    const counts = { 실속형: 0, 표준형: 0, 고급형: 0 };
    const answerMapping = {
      3: ["실속형", "표준형", "고급형"],
      4: ["실속형", "표준형", "고급형"],
      5: ["실속형", "표준형", "고급형"],
      6: ["실속형", "표준형", "고급형"],
    };

    Object.keys(answers).forEach((step) => {
      const answerIndex = answers[step];
      const mapping = answerMapping[step];

      if (mapping && answerIndex >= 0 && answerIndex < mapping.length) {
        const type = mapping[answerIndex];
        counts[type] += 1;
      }
    });

    const selectedType = Object.keys(counts).reduce((a, b) =>
      counts[a] > counts[b] ? a : b
    );

    setInsuranceType(selectedType);
    setShowRecommendation(true);
  };

  const getRecommendationMessage = () => {
    switch (insuranceType) {
      case "실속형":
        return (
          <>
            <span>{userName}님에게 맞는 보험을 추천해드려요!</span>
            <img src="./img/실속형_결과.png" alt="실속형 결과" />
          </>
        );
      case "표준형":
        return (
          <>
            <span>{userName}님에게 맞는 보험을 추천해드려요!</span>
            <img src="./img/표준형_결과.png" alt="표준형_결과" />
          </>
        );
      case "고급형":
        return (
          <>
            <span>{userName}님에게 맞는 보험을 추천해드려요!</span>
            <img src="./img/고급형_결과.png" alt="고급형_결과" />
          </>
        );
      default:
        return null;
    }
  };

  const renderButtons = () => {
    if (showRecommendation) {
      const handleClick = () => {
        onClose();
        updateInsuranceData();
        window.open(
          "https://www.directdb.co.kr/gnrl/prd/trvl/ovse/custInfoView.do?searchPdcCd=10543&pdcDvcd=g_ov_trvl"
        ); // 외부 링크 열기
      };
      return <Next onClick={handleClick}>보험 가입하러 가기</Next>;
    } else if (step === 2) {
      const handleComplete = () => {
        updateInsuranceData(); // 데이터 업데이트
        onClose();
      };
      return <Next onClick={handleComplete}>완료</Next>;
    } else if (step >= 1 && step <= 6) {
      return (
        <Next onClick={step === 6 ? determineInsuranceType : handleNext}>
          다음으로
        </Next>
      );
    }
    return null;
  };

  // 버튼 색상 결정 함수
  const getButtonColor = (step, answer) => {
    if (clickedButtons[step] === answer) {
      return "rgba(255, 249, 119, 0.4)"; // 클릭된 버튼 색상
    }
    return "#f8f8f8"; // 기본 색상
  };

  // API 호출 함수
  const updateInsuranceData = async () => {
    const userId = localStorage.getItem("userId");

    try {
      const response = await axios.put(
        "https://minsi.pythonanywhere.com/medicarrier/register.trip/",
        {
          insuranceType: insuranceType,
          user: userId,
          // 기타 필요한 데이터들
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error updating insurance data:", error);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>
          <img src="./img/ph_x.svg" alt="취소" />
        </CloseButton>
        {!showRecommendation ? (
          <>
            {step === 1 && (
              <>
                <p>현재 보험이 가입되어 있나요?</p>
                <Button
                  color={getButtonColor(1, 0)}
                  onClick={() => handleSelectAnswer(1, 0)}
                >
                  가입되어 있어요
                  <div>메디케리어가 보험과 안전 여행 될 수 있게 도울게요!</div>
                </Button>
                <Button
                  color={getButtonColor(1, 1)}
                  onClick={() => handleSelectAnswer(1, 1)}
                >
                  가입되어 있지 않아요
                  <div>메디캐리어가 보험을 추천해드릴게요!</div>
                </Button>
                {renderButtons()}
              </>
            )}
            {step === 2 && answers[1] === 0 && (
              <>
                <p>현재 가입되어 있는 보험을 선택해주세요!</p>
                <Button
                  color={getButtonColor(2, "실속형")}
                  onClick={() => handleSelectAnswer(2, "실속형")}
                >
                  실속형<div>가성비가 좋은 실속형!</div>
                </Button>
                <Button
                  color={getButtonColor(2, "표준형")}
                  onClick={() => handleSelectAnswer(2, "표준형")}
                >
                  표준형<div>가장 많이 선택하는 표준형!</div>
                </Button>
                <Button
                  color={getButtonColor(2, "고급형")}
                  onClick={() => handleSelectAnswer(2, "고급형")}
                >
                  고급형<div>든든한 프리미엄 고급형!</div>
                </Button>
                {renderButtons()}
              </>
            )}
            {step === 3 && (
              <>
                <p>가성비가 어느정도로 중요하신가요?</p>
                <Button
                  color={getButtonColor(3, 0)}
                  onClick={() => handleSelectAnswer(3, 0)}
                >
                  매우 중요해요<div>적은 경비로 여행하시는 분들</div>
                </Button>
                <Button
                  color={getButtonColor(3, 1)}
                  onClick={() => handleSelectAnswer(3, 1)}
                >
                  적당히 중요해요<div>여행 경비를 적절히 가지고 계신 분들</div>
                </Button>
                <Button
                  color={getButtonColor(3, 2)}
                  onClick={() => handleSelectAnswer(3, 2)}
                >
                  그렇게 중요하지 않아요<div>여행 경비가 넉넉하신 분들</div>
                </Button>
                {renderButtons()}
              </>
            )}
            {step === 4 && (
              <>
                <p>어떤 목적의 여행이신가요?</p>
                <Button
                  color={getButtonColor(4, 0)}
                  onClick={() => handleSelectAnswer(4, 0)}
                >
                  일상<div>혼자 혹은 친구들과 함께 여행을 가시는 분들</div>
                </Button>
                <Button
                  color={getButtonColor(4, 1)}
                  onClick={() => handleSelectAnswer(4, 1)}
                >
                  가족<div>가족과 함께 여행을 가시는 분들</div>
                </Button>
                <Button
                  color={getButtonColor(4, 2)}
                  onClick={() => handleSelectAnswer(4, 2)}
                >
                  비즈니스<div>일을 위해 여행을 가시는 분들</div>
                </Button>
                {renderButtons()}
              </>
            )}
            {step === 5 && (
              <>
                <p>여행 기간이 어떻게 되시나요?</p>
                <Button
                  color={getButtonColor(5, 0)}
                  onClick={() => handleSelectAnswer(5, 0)}
                >
                  일주일 이하<div>가볍게 여행을 다녀오시는 분들</div>
                </Button>
                <Button
                  color={getButtonColor(5, 1)}
                  onClick={() => handleSelectAnswer(5, 1)}
                >
                  일주일 이상-한 달 이하
                  <div>어느정도 기간동안 여행을 다녀오시는 분들</div>
                </Button>
                <Button
                  color={getButtonColor(5, 2)}
                  onClick={() => handleSelectAnswer(5, 2)}
                >
                  한 달 이상<div>길게 여행을 다녀오시는 분들</div>
                </Button>
                {renderButtons()}
              </>
            )}
            {step === 6 && (
              <>
                <p>여행 중 어떤 활동을 계획하고 계신가요?</p>
                <Button
                  color={getButtonColor(6, 0)}
                  onClick={() => handleSelectAnswer(6, 0)}
                >
                  주로 관광<div>관광을 위주로 여행하시는 분들</div>
                </Button>
                <Button
                  color={getButtonColor(6, 1)}
                  onClick={() => handleSelectAnswer(6, 1)}
                >
                  다양한 액티비티와 관광
                  <div>액티비티와 관광을 함께 즐기시는 분들</div>
                </Button>
                <Button
                  color={getButtonColor(6, 2)}
                  onClick={() => handleSelectAnswer(6, 2)}
                >
                  고위험 액티비티
                  <div>위험도가 높은 액티비티를 즐기시는 분들</div>
                </Button>
                {renderButtons()}
              </>
            )}
          </>
        ) : (
          <>
            {getRecommendationMessage()}
            {renderButtons()}
          </>
        )}
      </ModalContent>
    </ModalOverlay>
  );
}

export default InsuranceModal;

const CloseButton = styled.div`
  img {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 21px;
    height: 21px;
    cursor: pointer;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end; /* 아래쪽에 정렬 */
  z-index: 200;
`;

const ModalContent = styled.div`
  position: relative; /* 내부 요소들이 모달 내부에서 배치되도록 설정 */
  width: 100%;
  max-height: 80%;
  background: white;
  border-radius: 8px 8px 0 0; /* 모서리 둥글게 설정 */
  padding: 0;
  overflow-y: auto; /* 스크롤을 사용하여 내용이 잘리지 않도록 함 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px; /* 버튼과 내용 사이의 간격 조정 */
  animation: slideUp 0.3s ease-out; /* 아래에서 위로 올라오는 애니메이션 */

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
  p {
    color: black;
    font-size: 20px;
    font-family: Pretendard;
    font-weight: 700;
    line-height: 1.3;
    letter-spacing: -1.5px;
    word-wrap: break-word;
    padding: 28px 0px 9px 25px;
    margin: 0;
    width: 368px;
  }
  span {
    color: black;
    font-size: 20px;
    font-family: Pretendard;
    font-weight: 700;
    line-height: 26.76px;
    word-wrap: break-word;
    padding: 30px 0 15px 0;
    letter-spacing: -1.5px;
  }
  img {
    padding-bottom: 28px;
  }
`;

const Button = styled.button`
  padding: 15px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  color: var(--black, #000);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 133.8%; /* 24.084px */
  width: 96%;
  height: 87px;
  border-radius: 5px;
  background: ${(props) => props.color};
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(255, 249, 119, 0.4);
  }
  div {
    color: #494949;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: 133.8%; /* 20.07px */
    letter-spacing: -0.7px;
    word-wrap: normal;
  }
`;

const Next = styled.button`
  margin-top: 4px;
  width: 100%;
  height: 60px;
  border-radius: 5px;
  background: var(--Color, #4a7dff);
  color: #fff;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 133.8%; /* 26.76px */
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;