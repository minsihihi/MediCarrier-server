import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
  font-family: Pretendard;
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

const DocumentList = styled.ul`
  list-style: none;
  padding: 0;
  margin-left: 20px;
  align-self: flex-start;
`;

const DocumentItem = styled.li`
  font-family: Pretendard;
  font-size: 14px;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 11px;
  width: 100%;
  padding: 0 20px;
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

function DocumentGuide() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLatestAssist = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/medicarrier/assist", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          params: {
            user: localStorage.getItem("userId"), // 사용자 ID를 파라미터로 추가
          }
        });

        const data = response.data;

        if (data.length > 0) {
          // 가장 최근의 assist 항목 찾기
          const latestAssist = data.reduce((latest, item) => {
            return item.id > latest.id ? item : latest;
          }, data[0]);

          // `document` 필드를 문자열에서 배열로 변환
          const documentStr = latestAssist.document;
          const documentList = documentStr ? documentStr.split(',').map(doc => doc.trim()) : [];
          setDocuments(documentList);
        } else {
          setDocuments([]);
        }
      } catch (err) {
        setError(err);
        console.error("Error fetching document:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestAssist();
  }, []);

  return (
    <PageContainer>
      <Container>
        <ProgressIndicator step={3} />
        <Title>필요한 서류 목록</Title>
        <Subtitle>아래 서류를 준비해주세요</Subtitle>
        {loading ? (
          <p>로딩 중...</p>
        ) : error ? (
          <p>문서 목록을 가져오는 데 문제가 발생했습니다.</p>
        ) : (
          <DocumentList>
            {documents.length > 0 ? (
              documents.map((doc, index) => (
                <DocumentItem key={index}>{doc}</DocumentItem>
              ))
            ) : (
              <DocumentItem>서류가 없습니다.</DocumentItem>
            )}
          </DocumentList>
        )}
        <ButtonContainer>
          <Button onClick={() => navigate(-1)} primary={false}>
            이전
          </Button>
          <Button onClick={() => navigate("/home")} primary={true}>
            다음
          </Button>
        </ButtonContainer>
      </Container>
    </PageContainer>
  );
}

export default DocumentGuide;
