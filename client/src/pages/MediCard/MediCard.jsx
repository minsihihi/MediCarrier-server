import React, { useState, useEffect } from "react";
import axios from "axios";
import theme from "../../utils/theme";
import { CountryLanguageMap } from "../../utils/CountryLanguageMap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import styled, { ThemeProvider } from "styled-components";
import BasicInfoModal from "./BasicInfoModal";
import MediInfoModal from "./MediInfoModal";
import { Pagination } from "swiper/modules";
import "../../styles/Loader.css";
/**
 * index signature
 * [x: string]: string
 */
const default_basic_info = {};
const default_medi_info = {};

const MediCard = () => {
  const [mediCard, setMediCard] = useState({
    한국: {
      basic_info: default_basic_info,
      medi_info: default_medi_info,
    },
    영국: {
      basic_info: default_basic_info,
      medi_info: default_medi_info,
    },
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isBasicInfoModalOpen, setIsBasicInfoModalOpen] = useState(false);
  const [isMediInfoModalOpen, setIsMediInfoModalOpen] = useState(false);

  const translation_button_wrap = [
    "한국어",
    (() => {
      const filteredCountry = Object.keys(mediCard).find(
        (card) => card !== "한국" && card !== "영국"
      );
      return filteredCountry
        ? CountryLanguageMap[filteredCountry]?.language || "현지어"
        : "현지어";
    })(),
    "영어",
  ];

  const [selectedLanguage, setSelectedLanguage] = useState("한국어");

  useEffect(() => {
    const token = localStorage.getItem("token"); 
    const getCardsInfo = async () => {
      try {
        // API 요청 보내기
        const card_res = await axios.get(
          "https://minsi.pythonanywhere.com/medicarrier/translate/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
    
        // 응답 데이터 처리
        const koreanMediCard = card_res.data.medicard["한국"];
    
        if (koreanMediCard && koreanMediCard.medi_info && koreanMediCard.basic_info) {
          // 한국의 medi_info와 basic_info가 모두 존재하는 경우
          setMediCard(card_res.data.medicard);
          setIsLoading(false);
        } else {
          // 한국의 medi_info나 basic_info가 존재하지 않는 경우
          setMediCard({
            ...mediCard,
            일본: {
              basic_info: default_basic_info,
              medi_info: default_medi_info,
            },
          });
          setIsLoading(false);
          setIsBasicInfoModalOpen(true); // 기본 정보 모달을 엽니다.
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
        setIsLoading(false);
      }
    };

    getCardsInfo();
  }, []);

  const findCountryByLanguage = (language) => {
    const entry = Object.entries(CountryLanguageMap).find(
      ([_country, info]) => info.language === language
    );
    return entry ? entry[0] : "일본";
  };

  const selectedCountry = findCountryByLanguage(selectedLanguage);

  const default_information = [
    {
      label:
        selectedCountry === "한국"
          ? "이름"
          : Object.keys(mediCard[selectedCountry].basic_info)[0],
      value: Object.values(mediCard[selectedCountry].basic_info)[0],
    },
    {
      label:
        selectedCountry === "한국"
          ? "성별"
          : Object.keys(mediCard[selectedCountry].basic_info)[1],
      value: Object.values(mediCard[selectedCountry].basic_info)[1],
    },
    {
      label:
        selectedCountry === "한국"
          ? "국적"
          : Object.keys(mediCard[selectedCountry].basic_info)[2],
      value: Object.values(mediCard[selectedCountry].basic_info)[2],
    },
    {
      label:
        selectedCountry === "한국"
          ? "영어 이름"
          : Object.keys(mediCard[selectedCountry].basic_info)[3],
      value: Object.values(mediCard[selectedCountry].basic_info)[3],
    },
    {
      label:
        selectedCountry === "한국"
          ? "생년월일"
          : Object.keys(mediCard[selectedCountry].basic_info)[4],
      value: Object.values(mediCard[selectedCountry].basic_info)[4],
    },
    {
      label:
        selectedCountry === "한국"
          ? "신장"
          : Object.keys(mediCard[selectedCountry].basic_info)[5],
      value: Object.values(mediCard[selectedCountry].basic_info)[5],
    },
    {
      label:
        selectedCountry === "한국"
          ? "몸무게"
          : Object.keys(mediCard[selectedCountry].basic_info)[6],
      value: Object.values(mediCard[selectedCountry].basic_info)[6],
    },
    {
      label:
        selectedCountry === "한국"
          ? "혈액형"
          : Object.keys(mediCard[selectedCountry].basic_info)[7],
      value: Object.values(mediCard[selectedCountry].basic_info)[7],
    },
    {
      label:
        selectedCountry === "한국"
          ? "임신여부"
          : Object.keys(mediCard[selectedCountry].basic_info)[8],
      value: Object.values(mediCard[selectedCountry].basic_info)[8],
    },
  ];

  const medical_information = [
    {
      label:
        selectedCountry === "한국"
          ? "몸 상태"
          : Object.keys(mediCard[selectedCountry].medi_info)[0],
      value: Object.values(mediCard[selectedCountry].medi_info)[0],
    },
    {
      label:
        selectedCountry === "한국"
          ? "지병"
          : Object.keys(mediCard[selectedCountry].medi_info)[1],
      value: Object.values(mediCard[selectedCountry].medi_info)[1],
    },
    {
      label:
        selectedCountry === "한국"
          ? "현재 복용 약"
          : Object.keys(mediCard[selectedCountry].medi_info)[2],
      value: Object.values(mediCard[selectedCountry].medi_info)[2],
    },
    {
      label:
        selectedCountry === "한국"
          ? "알러지 유무"
          : Object.keys(mediCard[selectedCountry].medi_info)[3],
      value: Object.values(mediCard[selectedCountry].medi_info)[3],
    },
    {
      label:
        selectedCountry === "한국"
          ? "진료 기록"
          : Object.keys(mediCard[selectedCountry].medi_info)[4],
      value: Object.values(mediCard[selectedCountry].medi_info)[4],
    },
    {
      label:
        selectedCountry === "한국"
          ? "수술 기록"
          : Object.keys(mediCard[selectedCountry].medi_info)[5],
      value: Object.values(mediCard[selectedCountry].medi_info)[5],
    },
  ];

  if (isLoading)
    return (
      <div className="loader">
        <div className="justify-content-center jimu-primary-loading"></div>
      </div>
    );

  return (
    <Container>
      <Title>의료 카드</Title>
      <TransitionButtonContainer>
        {translation_button_wrap.map((text) => (
          <TransitionButton
            key={text}
            isSelected={selectedLanguage === text}
            onClick={() => setSelectedLanguage(text)}
          >
            {text}
          </TransitionButton>
        ))}
      </TransitionButtonContainer>
      <Swiper
        centeredSlides={true}
        slidesPerView={"auto"}
        spaceBetween={30}
        grabCursor={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <MedicalCard
            title="기본 정보"
            informations={default_information}
            onEdit={() => setIsBasicInfoModalOpen(true)}
          />
        </SwiperSlide>
        <SwiperSlide>
          <MedicalCard
            title="의료 정보"
            informations={medical_information}
            onEdit={() => setIsMediInfoModalOpen(true)}
          />
        </SwiperSlide>
      </Swiper>

      {isBasicInfoModalOpen && (
        <BasicInfoModal
          selectedCountry={selectedCountry}
          basicInfo={mediCard[selectedCountry].basic_info}
          setBasicInfo={(freshInfo) =>
            setMediCard((prevMediCard) => ({
              ...prevMediCard,
              [selectedCountry]: {
                ...prevMediCard[selectedCountry],
                basic_info: {
                  ...prevMediCard[selectedCountry].basic_info,
                  ...freshInfo,
                },
              },
            }))
          }
          onClose={() => setIsBasicInfoModalOpen(false)}
        />
      )}
      {isMediInfoModalOpen && (
        <MediInfoModal
          selectedCountry={selectedCountry}
          mediInfo={mediCard[selectedCountry].medi_info}
          setMediInfo={(freshInfo) =>
            setMediCard((prevMediCard) => ({
              ...prevMediCard,
              [selectedCountry]: {
                ...prevMediCard[selectedCountry],
                medi_info: {
                  ...prevMediCard[selectedCountry].medi_info,
                  ...freshInfo,
                },
              },
            }))
          }
          onClose={() => setIsMediInfoModalOpen(false)}
        />
      )}
    </Container>
  );
};

export default MediCard;

const Container = styled.div`
  width: 90%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Pretendard";

  & > .swiper {
    width: 100%;
    padding-bottom: 50px;
    & > .swiper-wrapper > .swiper-slide {
      width: 95%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

const Title = styled.h1`
  font-family: Pretendard;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #4a7dff;
`;

const TransitionButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 14px;
  margin-top: 0px;
`;

const TransitionButton = styled.button`
  font-family: Pretendard;
  width: 100px;
  height: 33px;
  background-color: ${({ isSelected }) => (isSelected ? "#4a7dff" : "#f8f8f8")};
  color: ${({ isSelected }) => (isSelected ? "#ffffff" : "#000000")};
  border-radius: 200px;
  border: none;

  &:nth-child(2) {
    margin: 0 8px;
  }
  &:hover {
    cursor: pointer;
    background-color: #4a7dff;
    color: #ffffff;
  }
`;

function MedicalCard({ title, informations, onEdit }) {
  return (
    <ThemeProvider theme={theme}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <EditButton onClick={onEdit}>
            <img src="./img/edit.svg" alt="edit_icon" />
          </EditButton>
        </CardHeader>
        <CardBody>
          {informations.map((information) => (
            <InfoRow key={information.label}>
              <InfoLabel>{information.label}</InfoLabel>
              <InfoValue>{information.value}</InfoValue>
            </InfoRow>
          ))}
        </CardBody>
      </Card>
    </ThemeProvider>
  );
}

const Card = styled.div`
  margin-top: 10px;
  width: 100%;
  height: 510px;
  padding: 25px;
  background: #fff;
  box-shadow: 0px 4px 12.9px 0px #00000014;
  border: 0.4px solid #9c9c9c4d;
  border-radius: 24px;
  overflow: hidden;
  @media ${({ theme }) => theme.device.mobile} {
    height: 380px;
  }
  @media ${({ theme }) => theme.device.tablet} {
    height: 460px;
  }
`;

const CardHeader = styled.div`
  padding: 0px 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardTitle = styled.span`
  font-family: Pretendard;
  font-size: 15px;
  font-weight: 700;
  line-height: 17.9px;
`;

const EditButton = styled.button`
  width: 20px;
  height: 21px;
  position: fixed;
  right: 25px;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
`;

const CardBody = styled.div`
  margin-top: 40px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const InfoLabel = styled.div`
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 16.71px;
  text-align: center;
  color: #6f6f6f;
`;

const InfoValue = styled.div`
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 600;
  line-height: 16.71px;
  text-align: right;
`;