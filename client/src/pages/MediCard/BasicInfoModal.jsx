import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import MediInfoModal from "./MediInfoModal";

const BasicInfoModal = ({ selectedCountry, basicInfo, setBasicInfo, onClose }) => {
  const [formState, setFormState] = useState(basicInfo || {});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSexDropdownOpen, setIsSexDropdownOpen] = useState(false);
  const [isPregnantDropdownOpen, setIsPregnantDropdownOpen] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});


  useEffect(() => {
    setFormState(basicInfo || {});
  }, [basicInfo]);

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

  const sexOptions = [
    "남",
    "여"
  ];

  const pregnantOptions = [
    "임신중",
    "임신 중 아님",
    "가능성 있음"
  ];

  const isSameValues = JSON.stringify(basicInfo) === JSON.stringify(formState);
  const [isMediInfoModalOpen, setIsMediInfoModalOpen] = useState(false);
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
  
    try {
      const getUrl = "https://minsi.pythonanywhere.com/medicarrier/translate/";
      const postUrl = "https://minsi.pythonanywhere.com/medicarrier/basicinfo/";
      const putUrl = "https://minsi.pythonanywhere.com/medicarrier/basicinfo/";
  
      // Check if basic info exists with a GET request
      let method = 'post'; // Default method is POST
      try {
        const response = await axios({
          method: 'get',
          url: getUrl,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.data && response.data.medicard["한국"] && response.data.medicard["한국"].basic_info) {
          // Data exists, so use PUT method
          method = 'put';
        }
      } catch (getError) {
        if (getError.response && (getError.response.status === 500 || getError.response.status === 404)) {
          console.warn("GET request failed with status 500 or 404. Proceeding with POST request.");
        } else {
          throw getError;
        }
      }
  
      // Send data using POST or PUT method
      const saveResponse = await axios({
        method: method,
        url: method === 'post' ? postUrl : putUrl,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          name: formState.name || "",
          sex: formState.sex,
          nationality: formState.nationality || "",
          english_name: formState.english_name || "",
          birthdate: formState.birthdate,
          height: formState.height || "",
          weight: formState.weight || "",
          bloodtype: formState.bloodtype,
          pregnant: formState.pregnant
        },
      });
  
      if (saveResponse.status !== 200 && saveResponse.status !== 201) {
        throw new Error(`Failed to save basic information: ${saveResponse.statusText}`);
      }
  
      setBasicInfo(formState);
      onClose();
      
      // If method was 'put', reload the page
    if (method === 'put') {
      window.location.reload();
    }
    if(method === 'post') {
      alert("의료 정보와 기본 정보를 모두 입력한 뒤 새로 고침 하여 전체 의료 카드를 확인할 수 있습니다.");
    }
      
    } catch (error) {
      console.error("Failed to save basic information", error);
    }
  };

  const areAllValuesEmpty = (obj) => {
    return Object.values(obj).every(
      (value) => value === "" || value === null || value === undefined
    );
  };

  const handleBloodTypeSelect = (bloodtype) => {
    setFormState((prev) => ({ ...prev, bloodtype }));
    setIsDropdownOpen(false);
  };

  const handleSexSelect = (sex) => {
    setFormState((prev) => ({ ...prev, sex }));
    setIsSexDropdownOpen(false);
  };

  const handlePregnantSelect = (status) => {
    setFormState((prev) => ({ ...prev, pregnant: status }));
    setIsPregnantDropdownOpen(false);
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>기본 정보 수정</ModalTitle>
          <SaveButton
            disabled={
              areAllValuesEmpty(basicInfo)
                ? !Object.values(formState).some(val => val !== "")
                : isSameValues
            }
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
          <InputRow>
            <InputLabel>이름</InputLabel>
            <Input
              name="name"
              value={formState.name || ""}
              onChange={handleChange}
            />
          </InputRow>
          <InputRow>
            <InputLabel>성별</InputLabel>
            <Dropdown>
              <DropdownButton
                onClick={() => setIsSexDropdownOpen(!isSexDropdownOpen)}
              >
                {formState.sex || "성별 선택"}
              </DropdownButton>
              {isSexDropdownOpen && (
                <DropdownMenu>
                  {sexOptions.map((sex) => (
                    <DropdownItem
                      key={sex}
                      onClick={() => handleSexSelect(sex)}
                    >
                      {sex}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              )}
            </Dropdown>
          </InputRow>
          <InputRow>
            <InputLabel>국적</InputLabel>
            <Input
              name="nationality"
              value={formState.nationality || ""}
              onChange={handleChange}
            />
          </InputRow>
          <InputRow>
            <InputLabel>영어 이름</InputLabel>
            <Input
              name="english_name"
              value={formState.english_name}
              onChange={handleChange}
            />
          </InputRow>
          <InputRow>
            <InputLabel>생년월일</InputLabel>
            <Input
              type="date"
              name="birthdate"
              value={formState.birthdate || ""}
              onChange={handleChange}
            />
          </InputRow>
          <InputRow>
            <InputLabel>신장</InputLabel>
            <Input
              name="height"
              value={formState.height || ""}
              onChange={handleChange}
            />
          </InputRow>
          <InputRow>
            <InputLabel>몸무게</InputLabel>
            <Input
              name="weight"
              value={formState.weight || ""}
              onChange={handleChange}
            />
          </InputRow>
          <InputRow>
            <InputLabel>혈액형</InputLabel>
            <Dropdown>
              <DropdownButton
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {formState.bloodtype || "혈액형 선택"}
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
            <InputLabel>임신여부</InputLabel>
            <Dropdown>
              <DropdownButton
                onClick={() => setIsPregnantDropdownOpen(!isPregnantDropdownOpen)}
              >
                {formState.pregnant || "임신여부 선택"}
              </DropdownButton>
              {isPregnantDropdownOpen && (
                <DropdownMenu>
                  {pregnantOptions.map((status) => (
                    <DropdownItem
                      key={status}
                      onClick={() => handlePregnantSelect(status)}
                    >
                      {status}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              )}
            </Dropdown>
          </InputRow>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
    
  );
};

export default BasicInfoModal;

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

const ErrorMessages = styled.div`
  color: red;
  margin-bottom: 15px;
`;

const ErrorMessage = styled.div`
  margin-bottom: 5px;
`;