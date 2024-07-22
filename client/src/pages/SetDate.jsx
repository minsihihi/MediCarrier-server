import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../components/CustomDatePicker.css"; // 커스텀 CSS 파일 임포트
import useTripStore from "../assets/tripStore";

const SetDate = () => {
  const navigate = useNavigate();
  const { startDate, setStartDate, setDates } = useTripStore();
  const { endDate, setEndDate } = useTripStore();

  const navigateToSetCountry = () => {
    navigate("/register.trip");
  };

  const navigateToHome = () => {
    if (startDate && endDate) {
      navigate("/");
      setDates(startDate, endDate); // 날짜를 Zustand 상태로 업데이트
    } else {
      alert("여행 기간을 설정해주세요.");
    }
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <>
      <Header>
        <button
          style={{ border: 0, backgroundColor: "transparent" }}
          onClick={navigateToSetCountry}
        >
          <img src="./img/arrow-left.svg" alt="back" />
        </button>
        내 여행
      </Header>
      <SetDateBox>
        <span>여행 기간을 설정해주세요</span>
        <Calendar>
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            dateFormat="yyyy/MM/dd"
          />
        </Calendar>
      </SetDateBox>
      <button
        style={{
          width: "80px",
          height: "44px",
          borderRadius: "8px",
          border: 0,
          background: "#4A7DFF",
          color: "#FFF",
          fontFamily: "Pretendard",
          fontSize: "20px",
          fontStyle: "normal",
          fontWeight: "700",
          lineHeight: "normal",
          letterSpacing: "-0.5px",
          position: "fixed",
          top: "600px",
          left: "293px",
        }}
        onClick={navigateToHome}
      >
        다음
      </button>
    </>
  );
};

export default SetDate;

const Calendar = styled.div`
  width: 346px;
  height: 296px;
  margin-top: 8px;
`;

const SetDateBox = styled.div`
  padding: 15px 20px 0 20px;
  span {
    color: var(--black, #000);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.5px;
    margin-bottom: 8px;
  }
`;

const Header = styled.div`
  display: inline-flex;
  height: 29px;
  padding: 13px 17px;
  align-items: center;
  gap: 124px;
  flex-shrink: 0;
  color: var(--mainblue, var(--Color, #4a7dff));
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -1px;
`;
