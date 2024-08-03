import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useTripStore from "../../assets/tripStore";

const SERVICE_COUNTRIES = [
  "남아프리카 공화국",
  "알바니아",
  "에티오피아",
  "아랍 국가들",
  "아르메니아",
  "아제르바이잔",
  "바스크",
  "벨라루스",
  "방글라데시",
  "보스니아",
  "불가리아",
  "카탈로니아",
  "필리핀",
  "말라위",
  "중국",
  "대만",
  "프랑스",
  "크로아티아",
  "체코",
  "덴마크",
  "네덜란드",
  "영국",
  "국제어",
  "에스토니아",
  "핀란드",
  "스페인",
  "조지아",
  "독일",
  "그리스",
  "인도",
  "아이티",
  "니제르",
  "하와이",
  "이스라엘",
  "헝가리",
  "아이슬란드",
  "나이지리아",
  "인도네시아",
  "아일랜드",
  "이탈리아",
  "일본",
  "자바",
  "카자흐스탄",
  "캄보디아",
  "한국",
  "터키",
  "키르기스스탄",
  "라오스",
  "로마",
  "라트비아",
  "리투아니아",
  "룩셈부르크",
  "북마케도니아",
  "마다가스카르",
  "말레이시아",
  "몰타",
  "뉴질랜드",
  "몽골",
  "미얀마",
  "네팔",
  "노르웨이",
  "파키스탄",
  "이란",
  "폴란드",
  "포르투갈",
  "루마니아",
  "러시아",
  "사모아",
  "스코틀랜드",
  "세르비아",
  "짐바브웨",
  "스리랑카",
  "슬로바키아",
  "슬로베니아",
  "소말리아",
  "탄자니아",
  "스웨덴",
  "타지키스탄",
  "태국",
  "우크라이나",
  "위구르",
  "우즈베키스탄",
  "베트남",
  "웨일스",
  "유대인",
  "남아프리카",
];
const SetCountry = () => {
  const navigate = useNavigate();
  const { country, setCountry } = useTripStore();
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [activeCountry, setActiveCountry] = useState(null);

  const handleSearch = (event) => {
    const term = event.target.value;
    setCountry(term);

    if (term) {
      const results = SERVICE_COUNTRIES.filter((country) =>
        country.includes(term)
      );
      setFilteredCountries(results);
    } else {
      setFilteredCountries([]);
    }
  };

  const handleCountryClick = (country) => {
    setCountry(country);
    setActiveCountry(country); // Set the active country
    setFilteredCountries([]);
  };

  return (
    <>
      <Header>
        <button
          style={{ border: 0, backgroundColor: "transparent" }}
          onClick={() => navigate("/")}
        >
          <img src="/img/arrow-left.svg" alt="back-icon" />
        </button>
        내 여행
      </Header>
      <SetCountryBox>
        <span>여행지를 설정해주세요</span>
        <CountrySearchBar>
          <input
            value={country}
            onChange={handleSearch}
            placeholder="어디로 가시나요?"
          />
          <img src="/img/search-normal.svg" alt="search" />
        </CountrySearchBar>
        {filteredCountries.length > 0 && (
          <CountryList>
            {filteredCountries.map((country) => (
              <CountryItem
                key={country}
                onMouseDown={() => setActiveCountry(country)}
                onMouseUp={() => handleCountryClick(country)}
                isActive={activeCountry === country}
              >
                {country}
              </CountryItem>
            ))}
          </CountryList>
        )}
      </SetCountryBox>
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
          fontWeight: "700",
          position: "fixed",
          top: "620px",
          left: "293px",
        }}
        onClick={() => {
          if (country) {
            navigate("/medicarrier/register.trip.date");
            setCountry(country);
          } else {
            alert("여행지를 설정해주세요.");
          }
        }}
      >
        다음
      </button>
    </>
  );
};

export default SetCountry;

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

const SetCountryBox = styled.div`
  padding: 15px 0;

  span {
    color: #000;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.5px;
    padding: 0 20px;
  }
`;

const CountrySearchBar = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding: 0 20px;

  input {
    width: 325px;
    height: 24px;
    padding: 15px 14px;
    border-radius: 8px;
    border: 0.5px solid #7e7e7e;
    color: #7e7e7e;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.5px;
  }
  input::placeholder {
    color: #7e7e7e;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.5px;
  }

  img {
    margin-left: -40px;
    width: 24px;
    height: 24px;
  }
`;

const CountryList = styled.div`
  width: 393px;
  height: 44px;
  /* background: rgba(227, 230, 240, 0.63); */
  color: var(--black, #000);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.5px;
  margin-top: 20px;
`;

const CountryItem = styled.div`
  padding: 12px 21px;
  cursor: pointer;

  background-color: ${(props) =>
    props.isActive ? "rgba(227, 230, 240, 0.63)" : "transparent"};

  &:hover {
    background-color: rgba(227, 230, 240, 0.63);
  }
`;
