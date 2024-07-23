import React, { useState } from "react";
import styled from "styled-components";
import useInsuranceStore from "../assets/insuranceStore";

function InsuranceModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [insuranceType, setInsuranceType] = useState("");
  const setInsurance = useInsuranceStore((state) => state.setInsuranceType); // insuranceStore에서 setInsuranceType 가져오기

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleSelect = (type) => {
    setInsuranceType(type);
    setInsurance(type);
    onClose();
  };

  return (
    <ModalOverlay>
      <ModalContent>
        {step === 1 && (
          <>
            <p>현재 보험이 가입되어 있나요?</p>
            <button onClick={handleNext}>가입되어 있어요</button>
            <button onClick={handleNext}>가입되어 있지 않아요</button>
          </>
        )}
        {step === 2 && (
          <>
            <p>현재 가입되어 있는 보험을 선택해주세요!</p>
            <button onClick={() => handleSelect("실속형")}>실속형</button>
            <button onClick={() => handleSelect("표준형")}>표준형</button>
            <button onClick={() => handleSelect("고급형")}>고급형</button>
          </>
        )}
        {/* 3단계부터 6단계까지의 질문을 추가합니다. */}
        {step === 3 && (
          <>
            <p>가성비가 어느정도로 중요하신가요?</p>
            <button onClick={() => handleNext()}>매우 중요해요</button>
            <button onClick={() => handleNext()}>적당히 중요해요</button>
            <button onClick={() => handleNext()}>그렇게 중요하지 않아요</button>
          </>
        )}
        {step === 4 && (
          <>
            <p>어떤 목적의 여행이신가요?</p>
            <button onClick={() => handleNext()}>일상</button>
            <button onClick={() => handleNext()}>가족</button>
            <button onClick={() => handleNext()}>비즈니스</button>
          </>
        )}
        {step === 5 && (
          <>
            <p>여행 기간이 어떻게 되시나요?</p>
            <button onClick={() => handleNext()}>일주일 이하</button>
            <button onClick={() => handleNext()}>일주일 이상-한 달 이하</button>
            <button onClick={() => handleNext()}>한 달 이상</button>
          </>
        )}
        {step === 6 && (
          <>
            <p>여행 중 어떤 활동을 계획하고 계신가요?</p>
            <button onClick={() => handleSelect("실속형")}>주로 관광</button>
            <button onClick={() => handleSelect("표준형")}>
              다양한 액티비티와 관광
            </button>
            <button onClick={() => handleSelect("고급형")}>
              고위험 액티비티
            </button>
          </>
        )}
      </ModalContent>
    </ModalOverlay>
  );
}

export default InsuranceModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  width: 393px;
  max-height: 80%;
  background: white;
  border-radius: 8px;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
