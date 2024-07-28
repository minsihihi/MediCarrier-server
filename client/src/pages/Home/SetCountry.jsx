import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useTripStore from "../../assets/tripStore";

const SERVICE_COUNTRIES = ["일본"];

const SetCountry = () => {
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/");
  };
  const navigateToSetDate = () => {
    if (country) {
      navigate("/medicarrier/register.trip.date");
      setCountry(country); // destination을 Zustand 상태로 업데이트
    } else {
      alert("여행지를 설정해주세요.");
    }
  };

  const { country, setCountry } = useTripStore();
  const [filteredCountries, setFilteredCountries] = useState([]);

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
    setFilteredCountries([]);
  };

  return (
    <>
      <Header>
        <button
          style={{ border: 0, backgroundColor: "transparent" }}
          onClick={navigateToHome}
        >
          <img src="/img/arrow-left.svg" alt="back" />
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
                onClick={() => handleCountryClick(country)}
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
          fontStyle: "normal",
          fontWeight: "700",
          lineHeight: "normal",
          letterSpacing: "-0.5px",
          position: "fixed",
          top: "550px",
          left: "293px",
        }}
        onClick={navigateToSetDate}
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
  background: rgba(227, 230, 240, 0.63);
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

  &:hover {
    background-color: #f0f0f0;
  }
`;
