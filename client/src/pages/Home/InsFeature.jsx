import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const InsFeature = () => {
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/home");
  };

  return (
    <>
      <Header>
        <button
          style={{ border: 0, backgroundColor: "transparent" }}
          onClick={navigateToHome}
        >
          <img src="../img/arrow-left.svg" alt="back" />
        </button>
        보험 알아보기
      </Header>
      <Content>
        <h1> 보장 범위 및 특징</h1>
        <Box style={{ background: "rgba(74, 125, 255, 0.10)" }}>
          <h2>해외발생사고, 질병의 치료비 보장</h2>
          <p>해당 특약 가입 시, 실손에 비례해 보상해드려요</p>
        </Box>
        <Box style={{ background: "rgba(74, 125, 255, 0.25)" }}>
          <h2>해외여행 중 실수로 인한 배상책임 보장</h2>
          <p>해당 특약가입 시</p>
        </Box>
        <Box style={{ background: "var(--main-50, rgba(74, 125, 255, 0.50))" }}>
          <h2>여행 동반인도 함께 가입 가능</h2>
          <p>최대 15명까지</p>
        </Box>
        <Box style={{ background: "var(--Color, #4A7DFF)" }}>
          <h2
            style={{
              color: "white",
              fontSize: 18,
              fontFamily: "Pretendard",
              fontWeight: "700",
              wordWrap: "break-word",
            }}
          >
            인터넷가입 평균 24.6% 저렴
          </h2>
          <p
            style={{
              width: "100%",
              color: "white",
              fontSize: 15,
              fontFamily: "Pretendard",
              fontWeight: "500",
              wordWrap: "break-word",
            }}
          >
            자사 오프라인 대비
          </p>
        </Box>
      </Content>
    </>
  );
};

export default InsFeature;

const Box = styled.div`
  width: 315px;
  height: 49px;
  padding: 17px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.03);
  margin-bottom: 28px;
  h2 {
    margin: 0;
    color: var(--black, #000);
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    padding-bottom: 10px;
  }
  p {
    margin: 0;
    color: var(--black, #000);
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

const Content = styled.div`
  margin-top: 58px;
  padding: 15px 22px;
  h1 {
    margin: 0;
    color: var(--black, #000);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.5px;
    padding-bottom: 20px;
  }
`;

const Header = styled.div`
  position: fixed;
  background: #ffffff;
  z-index: 10;
  top: 0px;
  display: inline-flex;
  height: 29px;
  padding: 13px 17px;
  align-items: center;
  width: 359px;
  gap: 95px;
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
