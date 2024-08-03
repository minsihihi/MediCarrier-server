import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import HomeIcon from "../assets/icons/home.svg";
import MedicalCardIcon from "../assets/icons/medicalCard.svg";
import MainIcon from "../assets/icons/mainIcon.svg";
import SearchMedicalIcon from "../assets/icons/search-status.svg";
import MyIcon from "../assets/icons/user.svg";
import SelectedHomeIcon from "../assets/icons/selected-home.svg";
import SelectedMedicalCardIcon from "../assets/icons/selected-medicalCard.svg";
import SelectedSearchMedicalIcon from "../assets/icons/selected-search-status.svg";
import SelectedMyIcon from "../assets/icons/selected-user.svg";

const NavBar = () => {
  const location = useLocation();

  return (
    <NavBarContainer>
      <HomeNavItem to="/home" selected={location.pathname === "/home"}>
        <HomeNavIcon
          src={location.pathname === "/home" ? SelectedHomeIcon : HomeIcon}
          alt="Home"
        />
        <HomeText selected={location.pathname === "/home"}>홈</HomeText>
      </HomeNavItem>
      <MedicalCardNavItem
        to="/medi-card"
        selected={location.pathname === "/medi-card"}
      >
        <MedicalCardNavIcon
          src={
            location.pathname === "/medi-card"
              ? SelectedMedicalCardIcon
              : MedicalCardIcon
          }
          alt="Medical Card"
        />
        <MediCardText
          style={{ marginRight: "4px" }}
          selected={location.pathname === "/medi-card"}
        >
          의료 카드
        </MediCardText>
      </MedicalCardNavItem>
      <MainNavItem to="/assist">
        <MainNavIcon src={MainIcon} alt="Main" />
      </MainNavItem>
      <SearchMedicalNavItem
        to="/search"
        selected={location.pathname === "/search"}
      >
        <SearchMedicalNavIcon
          src={
            location.pathname === "/search"
              ? SelectedSearchMedicalIcon
              : SearchMedicalIcon
          }
          alt="Search Medical"
        />
        <SearchMedicalText selected={location.pathname === "/search"}>
          의료 시설 검색
        </SearchMedicalText>
      </SearchMedicalNavItem>
      <MyNavItem to="/mypage" selected={location.pathname === "/mypage"}>
        <MyNavIcon
          src={location.pathname === "/mypage" ? SelectedMyIcon : MyIcon}
          alt="My"
        />
        <MyText selected={location.pathname === "/mypage"}>마이</MyText>
      </MyNavItem>
    </NavBarContainer>
  );
};

export default NavBar;

const NavBarContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 393px;
  height: 95px;
  flex-shrink: 0;
  background-color: #ffffff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  left: 196px;
  transform: translateX(-50%);
  border-top: 1px solid #e0e0e0;
`;

const NavItemBase = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #000000;
  font-size: 12px;
  font-family: Pretendard;
  span {
    margin-top: 5px;
  }
`;

const HomeNavItem = styled(NavItemBase)`
  img {
    width: ${({ selected }) => (selected ? "28px" : "24px")};
    height: ${({ selected }) => (selected ? "28px" : "24px")};
    margin-left: ${({ selected }) => (selected ? "10px" : "10px")};
  }
`;

const MedicalCardNavItem = styled(NavItemBase)`
  img {
    width: ${({ selected }) => (selected ? "28px" : "24px")};
    height: ${({ selected }) => (selected ? "24px" : "24px")};
    margin-left: -10px;
  }
`;

const MainNavItem = styled(NavItemBase)`
  img {
    width: 70px;
    height: 70px;
    margin-top: -45px;
    margin-left: -20px;
  }
`;

const SearchMedicalNavItem = styled(NavItemBase)`
  img {
    width: ${({ selected }) => (selected ? "30px" : "24px")};
    height: ${({ selected }) => (selected ? "30px" : "24px")};
    margin-left: -20px;
  }
`;

const MyNavItem = styled(NavItemBase)`
  img {
    width: ${({ selected }) => (selected ? "30px" : "24px")};
    height: ${({ selected }) => (selected ? "30px" : "24px")};
    margin-left: -20px;
  }
`;

const HomeNavIcon = styled.img``;
const MedicalCardNavIcon = styled.img``;
const MainNavIcon = styled.img``;
const SearchMedicalNavIcon = styled.img``;
const MyNavIcon = styled.img``;

const HomeText = styled.span`
  color: #000;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 400px;
  margin-left: 10px;
`;

const MediCardText = styled.span`
  color: #000;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 400px;
  margin-left: 0px;
`;

const SearchMedicalText = styled.span`
  color: #000;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 400px;
  margin-left: -25px;
`;

const MyText = styled.span`
  color: #000;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 400px;
  margin-left: -20px;
`;
