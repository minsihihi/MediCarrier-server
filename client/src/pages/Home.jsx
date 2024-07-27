import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useTripStore from "../assets/tripStore";
import useInsuranceStore from "../assets/insuranceStore";
import InsuranceModal from "../components/InsuranceModal";
import ChecklisteModal from "../components/ChecklisteModal";

function Home() {
  const navigate = useNavigate();
  const navigateToSetCountry = () => {
    navigate("/register.trip");
  };

  const navigateToInsFeature = () => {
    navigate("/insurance.feature");
  };
  const navigateToInsStep = () => {
    navigate("/insurance.step");
  };
  const navigateToInsContact = () => {
    navigate("/insurance.contact");
  };

  const navigateToAssistRecord = () => {
    navigate("/assist.record");
  };

  const { country, startDate, endDate } = useTripStore();
  const { insuranceType, insuranceName } = useInsuranceStore();
  const [isInsuranceModalOpen, setIsInsuranceModalOpen] = useState(false);
  const [isChecklistModalOpen, setIsChecklistModalOpen] = useState(false); // 모달 상태 추가

  const handleInsuranceBox = () => {
    setIsInsuranceModalOpen(true);
  };
  const handleChecklistBox = () => {
    setIsChecklistModalOpen(true);
  };

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

  // 여행이 종료되었는지 확인합니다.
  const isTripEnded = endDate ? currentDate > new Date(endDate) : false;

  console.log("Current tripStore state:", { country, startDate, endDate }); // 상태를 콘솔에 출력합니다.
  console.log("Current insuranceStore state:", { insuranceType }); // 상태를 콘솔에 출력합니다.

  return (
    <>
      <Logo>Medi Carrier</Logo>
      <Banner>
        <img src="./img/Group 33274.svg" alt="Banner" />
        <BannerText>
          {isTripEnded ? (
            <>
              <span
                style={{
                  fontFamily: "Pretendard",
                  fontSize: 19.5,
                  fontWeight: "400",
                  wordWrap: "break-word",
                  lineHeight: "1.1",
                  color: "#fff", // 텍스트 색상
                }}
              >
                여행은 만족스러우셨나요? <br />
                <span
                  style={{
                    color: "white",
                    fontSize: 19.5,
                    fontFamily: "Pretendard",
                    fontWeight: "700",
                    wordWrap: "break-word",
                  }}
                >
                  보험 청구
                </span>{" "}
                잊지 마세요!
              </span>
              <div
                style={{
                  color: "white",
                  fontSize: 10,
                  fontFamily: "Pretendard",
                  fontWeight: "400",
                  wordWrap: "break-word",
                  paddingTop: "4.5px",
                }}
              >
                여행 상태를 변경하려면 클릭해주세요
              </div>
            </>
          ) : country && startDate && endDate ? (
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
            {isTripEnded ? (
              <div
                style={{
                  width: 353,
                  height: 147,
                  position: "absolute",
                  left: "21px",
                  top: "240px",
                  background: "rgba(74.04, 124.71, 255, 0.85)",
                  borderRadius: 8,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: 20.5,
                    fontFamily: "Pretendard",
                    fontWeight: "600",
                    wordWrap: "break-word",
                    paddingBottom: "10px",
                    textShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  여행이 종료되었어요
                  <br />
                  새로운 여행을 등록해주세요
                </div>
                <div
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: 14,
                    fontFamily: "Pretendard",
                    fontWeight: "500",
                    wordWrap: "break-word",
                    letterSpacing: "-0.7px",
                    wordSpacing: "-0.7px",
                    textShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  새로운 여행 등록 시 <br />
                  기존 여행 정보 및 트리피 어시스트 정보가 초기화돼요!
                </div>
              </div>
            ) : (
              <InnerDiv>
                {startDate && endDate ? (
                  <>
                    출발일 <br />
                    {formattedStartDate} <br />
                    <br /> 도착일 <br />
                    {formattedEndDate}
                  </>
                ) : (
                  <>
                    여행 일정을
                    <br />
                    설정해주세요
                  </>
                )}
              </InnerDiv>
            )}
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
        <MyInsuranceBox onClick={handleInsuranceBox}>
          {insuranceType ? (
            <>
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
                  {insuranceName} - {insuranceType}
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
                  {insuranceType === "실속형" ? (
                    <>
                      가성비 요금 내고
                      <br /> 기본적으로 충분한 보장을!
                    </>
                  ) : insuranceType === "표준형" ? (
                    "가장 안정적이고 합리적인 선택!"
                  ) : insuranceType === "고급형" ? (
                    "최고의 혜택으로 완벽한 여행을!"
                  ) : null}
                </div>
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
          <img src="../img/Component 130.svg" alt="MyInsuranceBox icon" />
        </MyInsuranceBox>
      </MyInsurance>
      {isInsuranceModalOpen && (
        <InsuranceModal onClose={() => setIsInsuranceModalOpen(false)} />
      )}

      {isTripEnded && (
        <>
          <AssistRecord>
            어시스트 이용 기록
            <AssistRecordBox onClick={navigateToAssistRecord}>
              <div>
                <h2>{new Date(endDate).toLocaleDateString()}</h2>
                <p>
                  어시스트 이용 기록 <br /> 확인하러 가기
                </p>
              </div>
              <img src="../img/icon0.svg" alt="assist record icon" />
            </AssistRecordBox>
          </AssistRecord>
        </>
      )}

      <AboutInsurance>
        보험 알아보기
        <AboutInsuranceBoxes>
          <div onClick={navigateToInsFeature}>
            <span>
              <h1>보장 범위와 특징</h1>
              <h2>
                여행자 보험의 보장 범위와 특징을
                <br />
                정확히 알아보세요!
              </h2>
            </span>
            <img src="../img/icon1.svg" />
          </div>
          <div onClick={navigateToInsStep}>
            <span>
              <h1>보험 처리 절차 안내</h1>
              <h2>
                복잡한 보험 처리 절차를
                <br />
                자세히 알아보세요!
              </h2>
            </span>
            <img src="../img/icon2.svg" />
          </div>
          <div onClick={handleChecklistBox}>
            <span>
              <h1>보험 청구시 필요 서류</h1>
              <h2>
                보험금을 받기 위해 꼭 필요한
                <br />
                서류 리스트를 확인해보세요!
              </h2>
            </span>
            <img src="../img/icon3.svg" />
          </div>
          {isChecklistModalOpen && (
            <ChecklisteModal onClose={() => setIsChecklistModalOpen(false)} />
          )}
          <div onClick={navigateToInsContact}>
            <span>
              <h1>보험사 연락</h1>
              <h2>
                평일 오전 10시부터 오후 6시까지
                <br />
                친절한 상담원이 보험 처리를 도와드려요!
              </h2>
            </span>
            <img src="../img/icon4.svg" />
          </div>
        </AboutInsuranceBoxes>
      </AboutInsurance>
      <Chatting>
        진행 중인 채팅 상황
        <img src="../img/arrow-right-white.svg" />
      </Chatting>
    </>
  );
}

export default Home;

const AssistRecord = styled.div`
  color: var(--black, #000);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin: 0 20px 24px 20px;
  width: 353px;
`;

const AssistRecordBox = styled.div`
  border-radius: 8px;
  border: 1px solid #f5f5f5;
  background: #fff;
  width: 323px;
  height: 66px;
  padding: 17px 15px;
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  img {
    width: 74px;
    height: 71px;
  }
  h2 {
    margin: 0;
    color: var(--black, #000);
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 133.8%; /* 18.732px */
    padding-bottom: 9px;
  }
  p {
    margin: 0;
    color: #a7a7a7;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 133.8%; /* 18.732px */
  }
`;

const Chatting = styled.div`
  margin: 0 0 30px 20px;
  display: flex;
  width: 321px;
  padding: 13px 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  border-radius: 68px;
  background: linear-gradient(90deg, #2e68ff 0%, #4a7dff 55%);
  color: #fff;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  img {
    width: 24px;
    height: 24px;
  }
`;

const AboutInsurance = styled.div`
  color: var(--black, #000);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin: 0 20px 24px 20px;
  width: 353px;
`;
const AboutInsuranceBoxes = styled.div`
  div {
    border-radius: 8px;
    border: 1px solid #f5f5f5;
    background: #fff;
    width: 323px;
    height: 66px;
    padding: 17px 15px;
    margin-top: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
  }
  span {
    h1 {
      color: var(--black, #000);
      font-family: Pretendard;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: 133.8%; /* 18.732px */
      margin: 0;
      padding-bottom: 9px;
    }
    h2 {
      color: #a7a7a7;
      font-family: Pretendard;
      font-size: 13px;
      font-style: normal;
      font-weight: 400;
      line-height: 133.8%; /* 18.732px */
      letter-spacing: -0.5px;
      margin: 0;
    }
  }
`;

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