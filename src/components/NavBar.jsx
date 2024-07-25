import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import HomeIcon from "../assets/icons/home.svg";
import MedicalCardIcon from "../assets/icons/medicalCard.svg";
import MainIcon from "../assets/icons/mainIcon.svg";
import SearchMedicalIcon from "../assets/icons/search-status.svg";
import MyIcon from "../assets/icons/user.svg";

const NavBar = () => {
  return (
    <NavBarContainer>
      <NavItem to="/">
        <img src={HomeIcon} alt="Home" />
        <span>홈</span>
      </NavItem>
      <NavItem to="/medical-card">
        <img src={MedicalCardIcon} alt="Medical Card" />
        <span>의료 카드</span>
      </NavItem>
      <NavItem to="/main" className="main-icon">
        <img src={MainIcon} alt="Main" />
      </NavItem>
      <NavItem to="/search-medical">
        <img src={SearchMedicalIcon} alt="Search Medical" />
        <span>의료 시설 검색</span>
      </NavItem>
      <NavItem to="/my">
        <img src={MyIcon} alt="My" />
        <span>마이</span>
      </NavItem>
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
  left: 50%;
  transform: translateX(-50%);
  border-top: 1px solid #e0e0e0;
`;

const NavItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #000000;
  font-size: 12px;

  img {
    width: 24px;
    height: 44px;
    margin-bottom: 5px;
  }

  &.main-icon {
    img {
      width: 70px;
      height: 70px;
      margin-top: -35px; /*이거 맞나...?*/
    }
  }
`;
