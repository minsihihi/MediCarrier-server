import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useScriptStore, { onGetScript } from "../../assets/scriptStore";

const AssistRecord = () => {
  const { scriptComponents, transScriptComponents, documents } =
    useScriptStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScriptData = async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        await onGetScript();
      }
    };

    fetchScriptData();
  }, []);

  const navigateToHome = () => {
    navigate("/home");
  };

  return (
    <>
      <AssistRecordContainer>
        <Header>
          <button
            style={{ border: 0, backgroundColor: "transparent" }}
            onClick={navigateToHome}
          >
            <img src="../img/arrow-left.svg" alt="back" />
          </button>
          어시스트 이용 기록
        </Header>
        <Content>
          <MyScript>
            나의 증상 스크립트
            <ScriptBox>
              <div>한국어</div>
              <h3>{scriptComponents}</h3>
            </ScriptBox>
            <ScriptBox>
              <div>현지어</div>
              <h3>{transScriptComponents}</h3>
            </ScriptBox>
          </MyScript>
          <Document>
            보험 청구시 필요한 서류
            <DocumentBox>
              {documents.length > 0 ? (
                documents.map((doc, index) => (
                  <DocumentItem key={index}>{doc}</DocumentItem>
                ))
              ) : (
                <DocumentItem>서류가 없습니다.</DocumentItem>
              )}
            </DocumentBox>
          </Document>
        </Content>
      </AssistRecordContainer>
    </>
  );
};

export default AssistRecord;

const DocumentItem = styled.div`
  font-family: Pretendard;
  display: flex;
  align-items: center;
  width: 312px;
  height: 38px;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 15px;
  background: #fffdc9;
  margin-bottom: 8px;
`;

const DocumentBox = styled.div`
  margin-top: 16px;
`;

const Document = styled.div`
  color: var(--black, #000);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.5px;
`;

const ScriptBox = styled.div`
  display: flex;
  padding: 16px 20px 20px 20px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 12px;
  border: 1px solid #f5f5f5;
  background: #fff;
  margin-top: 16px;
  div {
    display: flex;
    padding: 4px 3px;
    align-items: center;
    gap: 10px;
    border-radius: 5px;
    background: var(--Color, #4a7dff);
    color: #fff;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.5px;
  }
  h3 {
    color: var(--black, #000);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.16px;
  }
`;

const MyScript = styled.div`
  color: var(--black, #000);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.5px;
  padding-top: 15px;
  padding-bottom: 40px;
`;

const Content = styled.div`
  background-color: #fafafa;
  padding: 55px 20px 400px 20px;
  height: 100%;
`;

const Header = styled.div`
  position: fixed;
  background-color: #fafafa;
  z-index: 10;
  top: 0px;
  display: inline-flex;
  height: 29px;
  padding: 13px 17px;
  align-items: center;
  width: 359px;
  gap: 74px;
  color: var(--mainblue, var(--Color, #4a7dff));
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -1px;
  img {
    cursor: pointer;
  }
`;

const AssistRecordContainer = styled.div`
  width: 100%;
  height: 100%;
  background: #fafafa;
`;
