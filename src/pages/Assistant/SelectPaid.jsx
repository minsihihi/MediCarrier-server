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
  padding-bottom: 95px;
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
  margin-bottom: 28px;
  margin-left: 20px;
  align-self: flex-start;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 352px;
`;

const ListItem = styled.li`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  font-size: 16px;
  background-color: ${(props) => (props.selected ? "#FFFDC9" : "#F8F8F8")};
  border-radius: 15px;
  margin-bottom: 8px;
  cursor: pointer;

  ${(props) =>
    props.id === "item1" &&
    `
    background-color: ${props.selected ? "#FFFDC9" : "#F8F8F8"};
    width: 92px;
    heigth: 39px;
  `}

  ${(props) =>
    props.id === "item2" &&
    `
    background-color: ${props.selected ? "#FFFDC9" : "#F8F8F8"};
    width: 181px;
    height: 19px;
    
  `}
  
  ${(props) =>
    props.id === "item3" &&
    `
    background-color: ${props.selected ? "#FFFDC9" : "#F8F8F8"};
    width: 98px;
    heigth: 39px;
  `}
`;

const ListItemText = styled.span`
  font-family: Pretendard;
  flex-grow: 1;
  font-weight: ${(props) => (props.selected ? "bold" : "normal")};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 11px;
  width: 100%;
  padding: 0 20px;
  position: absolute;
  bottom: 150px;
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

const SelectPaid = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleNext = () => {
    if (selectedItem) {
      navigate("/document-guide");
    }
  };

  return (
    <PageContainer>
      <Container>
        <ProgressIndicator step={3} />
        <Title>수납하신 병원비는 얼마였나요?</Title>
        <Subtitle>병원비에 따라 필요한 서류가 달라져요</Subtitle>
        <List>
          <ListItem
            id="item1"
            selected={selectedItem === "3만원 미만"}
            onClick={() => handleItemClick("3만원 미만")}
          >
            <ListItemText selected={selectedItem === "3만원 미만"}>
              3만원 미만
            </ListItemText>
          </ListItem>
          <ListItem
            id="item2"
            selected={selectedItem === "3만원 이상 ~ 10만원 미만"}
            onClick={() => handleItemClick("3만원 이상 ~ 10만원 미만")}
          >
            <ListItemText
              selected={selectedItem === "3만원 이상 ~ 10만원 미만"}
            >
              3만원 이상 ~ 10만원 미만
            </ListItemText>
          </ListItem>
          <ListItem
            id="item3"
            selected={selectedItem === "10만원 이상"}
            onClick={() => handleItemClick("10만원 이상")}
          >
            <ListItemText selected={selectedItem === "10만원 이상"}>
              10만원 이상
            </ListItemText>
          </ListItem>
        </List>
        <ButtonContainer>
          <Button onClick={() => navigate(-1)} primary={false}>
            이전
          </Button>
          <Button onClick={handleNext} primary={true} disabled={!selectedItem}>
            다음
          </Button>
        </ButtonContainer>
      </Container>
    </PageContainer>
  );
};

export default SelectPaid;
