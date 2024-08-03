// BasicInfoModal.jsx
import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const BasicInfoModal = ({
  selectedCountry,
  basicInfo,
  setBasicInfo,
  onClose,
}) => {
  const [formState, setFormState] = useState(basicInfo);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const bloodTypes = [
    "RH+ A",
    "RH- A",
    "RH+ B",
    "RH- B",
    "RH+ AB",
    "RH- AB",
    "RH+ O",
    "RH- O",
  ];

  const isSameValues = JSON.stringify(basicInfo) === JSON.stringify(formState);

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

    const method = areAllValuesEmpty(basicInfo) ? "post" : "put";
    const url = `https://minsi.pythonanywhere.com/medicarrier/basicinfo/`;
    try {
      const response = await axios({
        method: method,
        url: url,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: formState,
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error(
          `Failed to save basic information: ${response.statusText}`
        );
      }

      setBasicInfo(formState);
      onClose();
    } catch (error) {
      console.error("Failed to save basic information", error);
      onClose();
    }
  };

  const handleBloodTypeSelect = (bloodtype) => {
    setFormState((prev) => ({ ...prev, bloodtype }));
    setIsDropdownOpen(false);
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
          <ModalTitle>기본 정보 수정</ModalTitle>
          <SaveButton
            disabled={
              areAllValuesEmpty(basicInfo)
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
              {selectedCountry === "한국" ? "이름" : Object.keys(basicInfo)[0]}
            </InputLabel>
            <Input
              name={Object.keys(basicInfo)[0]}
              value={Object.values(formState)[0]}
              onChange={handleChange}
            />
          </InputRow>
          <InputRow>
            <InputLabel>
              {selectedCountry === "한국" ? "성별" : Object.keys(basicInfo)[1]}
            </InputLabel>
            <Select
              name={Object.keys(basicInfo)[1]}
              value={Object.values(formState)[1]}
              onChange={handleChange}
            >
              <option value="남">남</option>
              <option value="여">여</option>
            </Select>
          </InputRow>
          <InputRow>
            <InputLabel>
              {selectedCountry === "한국" ? "국적" : Object.keys(basicInfo)[2]}
            </InputLabel>
            <Input
              name={Object.keys(basicInfo)[2]}
              value={Object.values(formState)[2]}
              onChange={handleChange}
            />
          </InputRow>
          <InputRow>
            <InputLabel>
              {selectedCountry === "한국"
                ? "영어 이름"
                : Object.keys(basicInfo)[3]}
            </InputLabel>
            <Input
              name={Object.keys(basicInfo)[3]}
              value={Object.values(formState)[3]}
              onChange={handleChange}
            />
          </InputRow>
          <InputRow>
            <InputLabel>
              {selectedCountry === "한국"
                ? "생년월일"
                : Object.keys(basicInfo)[4]}
            </InputLabel>
            <Input
              name={Object.keys(basicInfo)[4]}
              value={Object.values(formState)[4]}
              onChange={handleChange}
            />
          </InputRow>
          <InputRow>
            <InputLabel>
              {selectedCountry === "한국" ? "신장" : Object.keys(basicInfo)[5]}
            </InputLabel>
            <Input
              name={Object.keys(basicInfo)[5]}
              value={Object.values(formState)[5]}
              onChange={handleChange}
            />
          </InputRow>
          <InputRow>
            <InputLabel>
              {selectedCountry === "한국"
                ? "몸무게"
                : Object.keys(basicInfo)[6]}
            </InputLabel>
            <Input
              name={Object.keys(basicInfo)[6]}
              value={Object.values(formState)[6]}
              onChange={handleChange}
            />
          </InputRow>
          <InputRow>
            <InputLabel>
              {selectedCountry === "한국"
                ? "혈액형"
                : Object.keys(basicInfo)[7]}
            </InputLabel>
            <Dropdown>
              <DropdownButton
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {Object.values(formState)[7] || "혈액형 선택"}
              </DropdownButton>
              {isDropdownOpen && (
                <DropdownMenu>
                  {bloodTypes.map((bloodtype) => (
                    <DropdownItem
                      key={bloodtype}
                      onClick={() => handleBloodTypeSelect(bloodtype)}
                    >
                      {bloodtype}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              )}
            </Dropdown>
          </InputRow>
          <InputRow>
            <InputLabel>
              {selectedCountry === "한국"
                ? "임신여부"
                : Object.keys(basicInfo)[8]}
            </InputLabel>
            <Select
              name={Object.keys(basicInfo)[8]}
              value={Object.values(formState)[8]}
              onChange={handleChange}
            >
              <option value="임신 중">임신 중</option>
              <option value="임신 중 아님">임신 중 아님</option>
              <option value="가능성 있음">가능성 있음</option>
            </Select>
          </InputRow>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default BasicInfoModal;

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
  z-index: 11;
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

const Select = styled.select`
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

const Dropdown = styled.div`
  position: relative;
  flex: 2;
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: 5px;
  border: none;
  border-bottom: none;
  border-radius: 5px;
  background-color: #f8f8f8;
  text-align: right;
  font-family: "Pretendard";
  font-size: 14px;
  font-weight: 600;
  color: #000;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  z-index: 1;
`;

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;
