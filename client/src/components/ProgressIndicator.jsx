import React from "react";
import styled from "styled-components";
import Step1 from "../assets/steps/step1.svg";
import Step2 from "../assets/steps/step2.svg";
import Step3 from "../assets/steps/step3.svg";

const ProgressContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 35px;
`;

const ProgressImage = styled.img`
  width: 100%;
  max-width: 393px;
`;

const ProgressIndicator = ({ step }) => {
  let stepImage;

  switch (step) {
    case 1:
      stepImage = Step1;
      break;
    case 2:
      stepImage = Step2;
      break;
    case 3:
      stepImage = Step3;
      break;
    default:
      stepImage = Step1;
      break;
  }

  return (
    <ProgressContainer>
      <ProgressImage src={stepImage} alt={`Step ${step}`} />
    </ProgressContainer>
  );
};

export default ProgressIndicator;
