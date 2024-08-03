import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function ChecklistModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [clickedButtons, setClickedButtons] = useState({});
  const [mainCondition, setMainCondition] = useState(null);

  const navigate = useNavigate();

  const handleSelectAnswer = (step, answer) => {
    setClickedButtons((prev) => ({ ...prev, [step]: answer }));
  };

  const handleNextClick = () => {
    if (step === 1) {
      if (clickedButtons[1] === "질병") {
        setStep(2);
      } else if (clickedButtons[1] === "상해") {
        setStep(3);
      }
    } else if (step === 2) {
      const type = "질병";
      const mainCondition = clickedButtons[2];
      console.log("Navigating to /insurance.checklist with:", {
        type,
        mainCondition,
      });
      navigate("/insurance.checklist", {
        state: { type, mainCondition },
      });
      onClose();
    } else if (step === 3) {
      setMainCondition(clickedButtons[3]);
      setStep(4);
    } else if (step === 4) {
      const type = "상해";
      const currentMainCondition = mainCondition; // Rename to avoid shadowing
      const subCondition = clickedButtons[4];
      console.log("Navigating to /insurance.checklist with:", {
        type,
        mainCondition: currentMainCondition,
        subCondition,
      });
      navigate("/insurance.checklist", {
        state: {
          type,
          mainCondition: currentMainCondition,
          subCondition,
        },
      });
      onClose();
    }
  };

  const getButtonColor = (step, answer) => {
    if (clickedButtons[step] === answer) {
      return "rgba(255, 249, 119, 0.4)";
    }
    return "#f8f8f8";
  };

  const questions = [
    {
      text: "어떤 정보를 알고 싶으신가요?",
      answers: [
        {
          text: (
            <>
              <div style={{ padding: "0 328px 0 0" }}>질병</div>
              <p>감기, 독감, 또는 고혈압과 같은 건강 상태의 변화</p>
            </>
          ),
          value: "질병",
        },
        {
          text: (
            <>
              <div style={{ padding: "0 328px 0 0" }}>상해</div>
              <p>사고로 인한 골절, 타박상, 또는 화상과 같은 신체 손상</p>
            </>
          ),
          value: "상해",
        },
      ],
    },
    {
      text: "해당하는 조건을 선택해주세요",
      answers: [
        { text: "입원" },
        { text: "통원" },
        { text: "사망" },
        { text: "후유장해" },
        { text: "수술" },
        { text: "진단" },
      ],
    },
    {
      text: "해당하는 조건을 선택해주세요",
      answers: [
        { text: "교통사고" },
        { text: "산재사고" },
        { text: "군복무중 사고" },
        { text: "의료사고 등 법원분쟁" },
        { text: "기타 상해사고" },
        { text: "사고확인서류 발급 불가" },
      ],
    },
    {
      text: "해당하는 조건을 선택해주세요",
      answers: [
        { text: "입원" },
        { text: "통원" },
        { text: "사망" },
        { text: "후유장해" },
        { text: "수술" },
        { text: "형사 합의 지원금" },
        { text: "교통사고처리지원금" },
        { text: "자동차 사고 변호사 선임 비용" },
        { text: "면허정지 및 취소위로금" },
        { text: "자동차 보험 할증지원금" },
        { text: "자동차 부상 치료비" },
        { text: "자동차 사고 성형수술비" },
      ],
    },
  ];

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>
          <img src="./img/ph_x.svg" alt="취소" />
        </CloseButton>
        <p>{questions[step - 1].text}</p>
        {step === 1 ? (
          questions[step - 1].answers.map((answer, index) => (
            <Button
              key={index}
              onClick={() =>
                handleSelectAnswer(step, answer.value || answer.text)
              }
              style={{
                backgroundColor: getButtonColor(
                  step,
                  answer.value || answer.text
                ),
              }}
            >
              {answer.text}
            </Button>
          ))
        ) : (
          <ButtonGrid>
            {questions[step - 1].answers.map((answer, index) => (
              <Button
                key={index}
                onClick={() =>
                  handleSelectAnswer(step, answer.value || answer.text)
                }
                style={{
                  backgroundColor: getButtonColor(
                    step,
                    answer.value || answer.text
                  ),
                }}
              >
                {answer.text}
              </Button>
            ))}
          </ButtonGrid>
        )}
        <NextButton onClick={handleNextClick}>다음으로</NextButton>
      </ModalContent>
    </ModalOverlay>
  );
}

export default ChecklistModal;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  width: 100%;
`;

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
  align-items: flex-end;
  z-index: 200;
`;

const ModalContent = styled.div`
  position: relative;
  width: 100%;
  max-height: 80%;
  background: white;
  border-radius: 8px;
  padding: 0 7px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  animation: slideUp 0.3s ease-out;

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
    padding: 28px 0 9px 27px;
    margin: 0;
    width: 100%;
  }
`;

const Button = styled.button`
  padding: 15px 10px;
  display: flex;
  flex-direction: column;
  color: var(--black, #000);
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 700;
  width: 100%;
  height: 87px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  align-items: center;
  justify-content: space-evenly;

  div {
    color: var(--black, #000);
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 133.8%;
  }
  p {
    color: #494949;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: 133.8%;
    padding: 6px 0 0 0;
    text-align: left;
  }
`;

const NextButton = styled.button`
  margin-top: 4px;
  width: 393px;
  height: 60px;
  border-radius: 5px;
  background: var(--Color, #4a7dff);

  color: #fff;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 133.8%;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
