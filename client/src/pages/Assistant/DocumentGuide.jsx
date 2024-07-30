import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProgressIndicator from "../../components/ProgressIndicator";
import checkedIcon from "../../assets/icons/checked.svg";
import uncheckedIcon from "../../assets/icons/unchecked.svg";

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
  font-family: "Pretendard";
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
  margin-bottom: 40px;
  margin-left: 20px;
  align-self: flex-start;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 352px;
  height: 48px;
`;

const ListItem = styled.li`
  font-family: "Pretendard";
  display: flex;
  align-items: center;
  padding: 10px 20px;
  font-size: 16px;
  background-color: ${(props) =>
    props.selected ? "rgba(255, 249, 119, 0.40)" : "#F8F8F8"};
  border-radius: 15px;
  margin-bottom: 8px;
  cursor: pointer;
`;

const ListItemText = styled.span`
  flex-grow: 1;
  font-weight: ${(props) => (props.selected ? "bold" : "normal")};
`;

const ListItemIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 11px;
  width: 100%;
  padding: 0 20px;
  position: absolute;
  bottom: 100px;
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

const DocumentGuide = () => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const [documents, setDocuments] = useState([
    "진단서",
    "진료비 계산서",
    "진료비 세부 내역서",
  ]); // 일단 가짜데이터 삽입해놨는데 백 연동하면서 수정하기

  useEffect(() => {
    // 백에서 서류 목록을 가져오는 함수 (API 호출)
    const fetchDocuments = async () => {
      try {
        const response = await fetch("/api/documents"); // API 엔드포인트 수정 필요
        const data = await response.json();
        setDocuments(data.documents); // 서류 목록을 상태에 저장
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, []);

  const handleItemClick = (item) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(item)
        ? prevSelectedItems.filter((i) => i !== item)
        : [...prevSelectedItems, item]
    );
  };

  const handleNext = () => {
    // 선택한 항목을 백엔드로 전송하거나 저장하는 로직 추가
    navigate("/next-page"); // 경로 수정하기
  };

  return (
    <PageContainer>
      <Container>
        <ProgressIndicator step={3} />
        <Title>
          입력해주신 조건에 따라
          <br />
          필요한 서류를 안내해 드렸어요
        </Title>
        <Subtitle>
          아래 체크리스트를 활용해 보험 청구에 필요한 서류를 꼭 챙기세요!
        </Subtitle>
        <List>
          {documents.map((doc, index) => (
            <ListItem
              key={index}
              selected={selectedItems.includes(doc)}
              onClick={() => handleItemClick(doc)}
            >
              <ListItemText selected={selectedItems.includes(doc)}>
                {doc}
              </ListItemText>
              <ListItemIcon
                src={selectedItems.includes(doc) ? checkedIcon : uncheckedIcon}
                alt="checkbox"
              />
            </ListItem>
          ))}
        </List>
        <ButtonContainer>
          <Button onClick={() => navigate(-1)} primary={false}>
            이전
          </Button>
          <Button onClick={handleNext} primary={true}>
            완료
          </Button>
        </ButtonContainer>
      </Container>
    </PageContainer>
  );
};

export default DocumentGuide;
