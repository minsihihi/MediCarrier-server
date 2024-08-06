import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const MediInfoModal = ({ selectedCountry, mediInfo, setMediInfo, onClose }) => {
  const [formState, setFormState] = useState(mediInfo || {});
  const [errorMessages, setErrorMessages] = useState({});

  const fieldLabels = {
    condition: "몸 상태",
    illness: "지병",
    medicine: "현재 복용 약",
    allergy: "알러지 유무",
    diagnosis: "진료 기록",
    surgery: "수술 기록"
  };
  

  useEffect(() => {
    setFormState(mediInfo || {});
  }, [mediInfo]);

  const isSameValues = JSON.stringify(mediInfo) === JSON.stringify(formState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    const getUrl = "https://minsi.pythonanywhere.com/medicarrier/translate/";
    const postUrl = "https://minsi.pythonanywhere.com/medicarrier/mediinfo/";
    const putUrl = "https://minsi.pythonanywhere.com/medicarrier/mediinfo/";

    let method = 'post';

    try {
      try {
        const response = await axios({
          method: 'get',
          url: getUrl,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && response.data.medicard["한국"] && response.data.medicard["한국"].medi_info) {
          method = 'put';
        }
      } catch (getError) {
        if (getError.response && (getError.response.status === 500 || getError.response.status === 404)) {
          console.warn("GET request failed with status 500 or 404. Proceeding with POST request.");
        } else {
          throw getError;
        }
      }

      const saveResponse = await axios({
        method: method,
        url: method === 'post' ? postUrl : putUrl,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: formState,
      });

      if (saveResponse.status !== 200 && saveResponse.status !== 201) {
        throw new Error(`Failed to save medical information: ${saveResponse.statusText}`);
      }

      setMediInfo(formState);
      onClose();
      // If method was 'put', reload the page
    if (method === 'put') {
      window.location.reload();
    }
    if(method === 'post') {
      alert("의료 정보와 기본 정보를 모두 입력한 뒤 전체 의료 카드를 확인할 수 있습니다.");
    }
    } catch (error) {
      console.error("Failed to save medical information", error);
    }
  };

  const areAllValuesEmpty = (obj) => {
    return Object.values(obj).every(
      (value) => value === "" || value === null || value === undefined
    );
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>의료 정보 수정</ModalTitle>
          <SaveButton
            disabled={areAllValuesEmpty(formState) || isSameValues}
            onClick={isSameValues ? undefined : handleSave}
          >
            저장
          </SaveButton>
        </ModalHeader>
        <ModalBody>
          {Object.keys(errorMessages).length > 0 && (
            <ErrorMessages>
              {Object.entries(errorMessages).map(([field, messages]) => (
                <ErrorMessage key={field}>
                  {messages.join(", ")}
                </ErrorMessage>
              ))}
            </ErrorMessages>
          )}
          {["condition", "illness", "medicine", "allergy", "diagnosis", "surgery"].map((field) => (
            <InputRow key={field}>
              <InputLabel>{fieldLabels[field]}</InputLabel>
              <Input
                name={field}
                value={formState[field] || ""}
                onChange={handleChange}
              />
            </InputRow>
          ))}
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default MediInfoModal;

// Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  max-width: 393px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  height: 560px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
`;

const ModalTitle = styled.div`
  font-family: "Pretendard";
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  flex: 1;
`;

const SaveButton = styled.button`
  font-family: "Pretendard";
  width: 40px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => (props.disabled ? "#CED4DA" : "#4a7dff")};
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  position: absolute;
  right: 0;
`;

const ModalBody = styled.div`
  margin-top: 41px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const InputRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InputLabel = styled.label`
  color: #6f6f6f;
  font-family: "Pretendard";
  font-size: 14px;
  font-weight: 500;
  line-height: normal;
  flex: 1;
`;

const Input = styled.input`
  color: #000;
  text-align: right;
  font-family: "Pretendard";
  font-size: 14px;
  font-weight: 600;
  line-height: normal;
  flex: 2;
  padding: 5px;
  border: none;
  border-bottom: none;
  border-radius: 5px;
  &:focus {
    outline: none;
  }
`;

const ErrorMessages = styled.div`
  color: red;
  margin-bottom: 15px;
`;

const ErrorMessage = styled.div`
  margin-bottom: 5px;
`;
