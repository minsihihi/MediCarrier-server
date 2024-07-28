import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const SignupSucces = () => {
  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <Container>
        <h2>축하합니다 !</h2>
        <p>
          회원가입이 완료되었습니다 <br /> 같은 정보로 로그인하시겠습니까?
        </p>
        <img src="../../img/회원가입_성공.svg" />
        <button onClick={navigateToLogin}>로그인</button>
      </Container>
    </>
  );
};

export default SignupSucces;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 126px 0 47px 0;
  h2 {
    color: var(--black, #000);
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.5px;
    margin-bottom: 16px;
  }
  p {
    color: var(--black, #000);
    text-align: center;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.5px;
    margin-bottom: 65px;
  }
  img {
    width: 288px;
    height: 206px;
    margin-bottom: 164px;
  }
  button {
    display: flex;
    width: 353px;
    height: 50px;
    padding: 13px 91px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 8px;
    background: var(--Color, #4a7dff);
    border: 0;
    margin-top: 0px;

    color: #fff;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.5px;
    cursor: pointer;
  }
`;
