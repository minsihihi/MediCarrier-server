import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const specialties = [
  "내과",
  "외과",
  "정형외과",
  "이비인후과",
  "응급실",
  "산부인과",
  "피부과",
  "치과",
  "안과",
  "비뇨기과",
  "신경외과",
  "항문외과",
  "성형외과",
  "정신건강의학과",
];

const InputSearch = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const navigateToMap = () => {
    navigate("/search.map", { state: { searchValue } });
  };

  const handleRecommendClick = (value) => {
    setSearchValue(value);
  };

  return (
    <>
      <Content>
        <Title>의료시설을 검색해보세요!</Title>
        <SearchBar>
          <input
            placeholder="검색어를 입력하세요"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <img
            src="/img/search-normal-gray.svg"
            alt="search"
            onClick={navigateToMap}
          />
        </SearchBar>
        <Recommend>
          추천 검색어
          <RecommendCardContainer>
            {specialties.map((specialty) => (
              <RecommendCard
                key={specialty}
                onClick={() => handleRecommendClick(specialty)}
              >
                {specialty}
              </RecommendCard>
            ))}
          </RecommendCardContainer>
        </Recommend>
      </Content>
    </>
  );
};

export default InputSearch;

const RecommendCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin-top: 11px;
`;

const RecommendCard = styled.div`
  padding: 10px 12px;
  border-radius: 53px;
  border: 1px solid var(--Color, #4a7dff);
  background: #fff;
  color: var(--black, #000);
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
`;

const Recommend = styled.div`
  color: #bebebe;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  input {
    border-width: 0 0 1px;
    width: 353px;
    padding: 5px 2px;
    color: black;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  input::placeholder {
    color: #bebebe;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  img {
    margin-left: -40px;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
`;

const Title = styled.div`
  color: var(--black, #000);
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const Content = styled.div`
  margin: 128px 20px;
  display: flex;
  flex-direction: column;
  gap: 51px;
`;
