import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useTripStore from "../assets/tripStore";

function Home() {
  const navigate = useNavigate();
  const navigateToSetCountry = () => {
    navigate("/register.trip");
  };
  const { country, startDate, endDate } = useTripStore(); // 상태를 가져옵니다.
  console.log("Current tripStore state:", { country, startDate, endDate }); // 상태를 콘솔에 출력합니다.

  // 현재 날짜를 가져옵니다.
  const currentDate = new Date();
  let daysSinceStart = null;

  if (startDate) {
    const start = new Date(startDate);
    daysSinceStart = Math.ceil((currentDate - start) / (1000 * 60 * 60 * 24));
  }
  // startDate와 endDate를 문자열 형식으로 변환합니다.
  const formattedStartDate = startDate
    ? new Date(startDate).toLocaleDateString()
    : null;
  const formattedEndDate = endDate
    ? new Date(endDate).toLocaleDateString()
    : null;

  return (
    <>
      <Logo>Medi Carrier</Logo>
      <Banner>
        <img src="./img/Group 33274.svg" alt="Banner" />
        <BannerText>
          {country && startDate && endDate ? (
            <>
              <span
                style={{
                  fontFamily: "Pretendard",
                  fontSize: "20.5px",
                  fontWeight: "300",
                  wordWrap: "break-word",
                  lineHeight: "1.3", // 줄 간격 조정
                }}
              >
                메디캐리어와 함께하는 <br /> {country} 여행&nbsp;
              </span>
              <span
                style={{
                  fontFamily: "Pretendard",
                  fontSize: "20.5px",
                  fontWeight: "600",
                  wordWrap: "break-word",
                  lineHeight: "1.3", // 줄 간격 조정
                }}
              >
                {daysSinceStart}일차
              </span>
            </>
          ) : (
            <div style={{ width: "100%" }}>
              <span
                style={{
                  fontSize: "20.5px",
                  fontWeight: "400",
                  wordWrap: "break-word",
                  lineHeight: "1.1", // 줄 간격 조정
                }}
              >
                여행일정이
                <br />
                아직&nbsp;
              </span>
              <span
                style={{
                  fontSize: "20.5px",
                  fontWeight: "700",
                  wordWrap: "break-word",
                  lineHeight: "1.1", // 줄 간격 조정
                }}
              >
                등록되지 않았어요
              </span>
              <div
                style={{
                  fontSize: "10px",
                  fontWeight: "400",
                  wordWrap: "break-word",
                  paddingTop: "4.5px",
                  paddingBottom: "20.5px",
                }}
              >
                여행 장소와 일정을 등록해주세요!
              </div>
            </div>
          )}
        </BannerText>
      </Banner>
      <MyTrip>
        내 여행
        <MyTripBox>
          <MyCountry>
            여행 장소
            <InnerDiv>
              {country ? (
                country
              ) : (
                <>
                  여행 장소를
                  <br />
                  설정해주세요
                </>
              )}
            </InnerDiv>
          </MyCountry>
          <MyDate>
            여행 일정
            <InnerDiv>
              {startDate ? (
                <>
                  출발일
                  <br /> {formattedStartDate}
                  <br />
                  <br /> 도착일
                  <br /> {formattedEndDate}
                </>
              ) : (
                <>
                  여행 일정을
                  <br />
                  설정해주세요
                </>
              )}
            </InnerDiv>
          </MyDate>
          <button
            onClick={navigateToSetCountry}
            style={{
              border: 0,
              backgroundColor: "transparent",
              position: "relative",
              top: "12px",
              right: "35px",
              width: "50px",
              height: "30px",
            }}
          >
            <img src="./img/arrow-right.svg" alt="navigate to SetCountry" />
          </button>
        </MyTripBox>
      </MyTrip>
      <MyInsurance>
        내 보험
        <MyInsuranceBox>
          <div>
            <div
              style={{
                color: "black",
                fontSize: "14px",
                fontFamily: "Pretendard",
                fontWeight: "700",
                lineHeight: "18.73px",
                wordWrap: "break-word",
                paddingBottom: "9px",
              }}
            >
              아직 보험이 등록되지 않았어요
            </div>
            <div
              style={{
                color: "#494949",
                fontSize: "14px",
                fontFamily: "Pretendard",
                fontWeight: "400",
                lineHeight: "18.73px",
                wordWrap: "break-word",
              }}
            >
              클릭해서 <br />
              보험을 등록해보세요
            </div>
          </div>
          <img src="./img/Component 130.svg" alt="Banner" />
        </MyInsuranceBox>
      </MyInsurance>
      {/*<AboutInsurance>
        보험 알아보기
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </AboutInsurance> */}
    </>
  );
}

export default Home;

const MyInsurance = styled.div`
  color: var(--black, #000);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin: 0 20px 24px 20px;
  width: 353px;
  height: 135px;
`;
const MyInsuranceBox = styled.div`
  width: 353px;
  height: 100px;
  margin-top: 16px;
  border-radius: 8px;
  border: 1px solid #f5f5f5;
  background: #fffedf;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.03);
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const InnerDiv = styled.div`
  color: var(--black, #000);
  font-family: Pretendard;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px; /* 115.385% */
  margin-top: 18px;
`;

const MyCountry = styled.div`
  width: 113px;
  height: 115px;
  flex-shrink: 0;
  border-radius: 8px 16px 16px 8px;
  border: 1px solid #f5f5f5;
  background: #fff;
  font-size: 15px;
  font-weight: 700;
  padding: 16px 18px;
`;

const MyDate = styled.div`
  width: 187px;
  height: 115px;
  flex-shrink: 0;
  border-radius: 16px 8px 8px 16px;
  border: 1px solid #f5f5f5;
  background: #fff;
  font-size: 15px;
  font-weight: 700;
  padding: 16px 0 16px 18px;
`;

const MyTripBox = styled.div`
  width: 353px;
  height: 147px;
  margin-top: 16px;
  display: flex;
`;

const MyTrip = styled.div`
  color: var(--black, #000);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin: 0 20px 24px 20px;
  width: 353px;
  height: 182px;
`;

const Banner = styled.div`
  width: 353px;
  height: 112px;
  position: relative;
  margin: 20px 20px 24px 20px;
`;

const BannerText = styled.div`
  position: absolute;
  top: 27px;
  left: 16px;
  color: #fff;
  font-family: Pretendard;
  font-style: normal;
  line-height: normal;
`;

const Logo = styled.div`
  color: var(--mainblue, var(--Color, #4a7dff));
  font-family: Amaranth;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.5px;
  margin: 8px 213px 8px 20px;
`;
