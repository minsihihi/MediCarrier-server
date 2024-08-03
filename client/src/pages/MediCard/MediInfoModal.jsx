import React, { useState } from "react";
import axios from "axios"; // axios 불러오기
import styled from "styled-components";

const MediInfoModal = ({ selectedCountry, mediInfo, setMediInfo, onClose }) => {
  const [formState, setFormState] = useState(mediInfo);

  const isSameValues = JSON.stringify(mediInfo) === JSON.stringify(formState);

  const areAllValuesEmpty = (obj) => {
    return Object.values(obj).every(
      (value) => value === "" || value === null || value === undefined
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await axios({
        method: areAllValuesEmpty(mediInfo) ? "post" : "put",
        url: "https://minsi.pythonanywhere.com/medicarrier/mediinfo/",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: formState,
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error(
          `Failed to save medical information: ${response.statusText}`
        );
      }

      setMediInfo(formState);
      onClose();
    } catch (error) {
      console.error("Failed to save medical information", error);
    }
  };

  function isNotEmpty(value) {
    if (value === null || value === undefined) return false;
    if (typeof value === "string" && value.trim() === "") return false;
    if (Array.isArray(value) && value.length === 0) return false;
    if (typeof value === "object" && Object.keys(value).length === 0)
      return false;
    return true;
  }

  function checkObjectValues(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (!isNotEmpty(obj[key])) {
          return false;
        }
      }
    }
    return true;
  }

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>의료 정보 수정</ModalTitle>
          <SaveButton
            disabled={
              areAllValuesEmpty(mediInfo)
                ? !checkObjectValues(formState)
                : isSameValues
            }
            onClick={isSameValues ? undefined : handleSave}
          >
            저장
          </SaveButton>
        </ModalHeader>
        <ModalBody>
          <InputRow>
            <InputLabel>
              {selectedCountry === "한국"
                ? "몸 상태"
                : Object.keys(mediInfo)[0]}
            </InputLabel>
            <Input
              name={Object.keys(mediInfo)[0]}
              value={Object.values(formState)[0]}
              onChange={handleChange}
            />
          </InputRow>
          <InputRow>
            <InputLabel>
              {selectedCountry === "한국" ? "지병" : Object.keys(mediInfo)[1]}
            </InputLabel>
            <Input
              name={Object.keys(mediInfo)[1]}
              value={Object.values(formState)[1]}
              onChange={handleChange}
            />
          </InputRow>
          <InputRow>
            <InputLabel>
              {selectedCountry === "한국"
                ? "현재 복용 약"
                : Object.keys(mediInfo)[2]}
            </InputLabel>
            <Input
              name={Object.keys(mediInfo)[2]}
              value={Object.values(formState)[2]}
              onChange={handleChange}
            />
          </InputRow>
          <InputRow>
            <InputLabel>
              {selectedCountry === "한국"
                ? "알러지 유무"
                : Object.keys(mediInfo)[3]}
            </InputLabel>
            <Input
              name={Object.keys(mediInfo)[3]}
              value={Object.values(formState)[3]}
              onChange={handleChange}
            />
          </InputRow>
          <InputRow>
            <InputLabel>
              {selectedCountry === "한국"
                ? "진료 기록"
                : Object.keys(mediInfo)[4]}
            </InputLabel>
            <Input
              name={Object.keys(mediInfo)[4]}
              value={Object.values(formState)[4]}
              onChange={handleChange}
            />
          </InputRow>
          <InputRow>
            <InputLabel>
              {selectedCountry === "한국"
                ? "수술 기록"
                : Object.keys(mediInfo)[5]}
            </InputLabel>
            <Input
              name={Object.keys(mediInfo)[5]}
              value={Object.values(formState)[5]}
              onChange={handleChange}
            />
          </InputRow>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default MediInfoModal;

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
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  flex: 1;
`;

const Input = styled.input`
  color: #000;
  text-align: right;
  font-family: "Pretendard";
  font-size: 14px;
  font-style: normal;
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
