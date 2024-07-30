import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const InsStep = () => {
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
        <h1>보험 처리 절차 안내</h1>
        <Box style={{ background: "rgba(74, 125, 255, 0.10)" }}>
          <h2>1단계</h2>
          <p>DB 손해보험으로 사고 통보</p>
        </Box>
        <Box style={{ background: "rgba(74, 125, 255, 0.25)" }}>
          <h2>2단계</h2>
          <p>DB 손해보험에서 보험금 청구 서류 안내</p>
        </Box>
        <Box style={{ background: "var(--main-50, rgba(74, 125, 255, 0.50))" }}>
          <h2>3단계</h2>
          <p>피보험자 보험금 청구 서류 DB 손해보험으로 송부</p>
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
            4단계
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
            보험금 수령
          </p>
        </Box>
      </Content>
    </>
  );
};

export default InsStep;

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
    font-size: 15px;
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
