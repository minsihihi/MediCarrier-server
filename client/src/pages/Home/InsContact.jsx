import React from "react";
import styled from "styled-components";
import useInsuranceStore from "../../assets/insuranceStore";
import { useNavigate } from "react-router-dom";

const InsContact = () => {
  const { insuranceCall, insuranceName } = useInsuranceStore();

  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/");
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
        <p>보험사 연락</p>
        <ContactBox>
          {insuranceName} 24시간 전화상담
          <Call>
            <img src="../img/call-calling.svg" />
            {insuranceCall}
          </Call>
        </ContactBox>
      </Content>
    </>
  );
};

export default InsContact;

const Call = styled.div`
  display: flex;
  width: 131px;
  height: 13px;
  padding: 7px 16px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 200px;
  background: var(--Color, #4a7dff);
  margin-top: 9px;

  color: #fff;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const ContactBox = styled.div`
  width: 338px;
  height: 55px;
  border-radius: 10px;
  background: #f8f8f8;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.03);
  display: flex;
  color: var(--black, #000);
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  flex-direction: column;
  justify-content: center;
  padding: 14px 11px;
`;

const Content = styled.div`
  margin: 70px 15px;
  p {
    margin-bottom: 20px;
    color: var(--black, #000);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    letter-spacing: -0.5px;
  }
`;

const Header = styled.div`
  position: fixed;
  background: #fafafa;
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
