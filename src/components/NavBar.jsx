import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import HomeIcon from "../assets/icons/home.svg";
import MedicalCardIcon from "../assets/icons/medicalCard.svg";
import MainIcon from "../assets/icons/mainIcon.svg";
import SearchMedicalIcon from "../assets/icons/searchMedical.svg";
import MyIcon from "../assets/icons/myIcon.svg";

const NavBarContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 393px;
  height: 95px;
  flex-shrink: 0;
  background-color: #ffffff;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-around;
  align-items: center;
  left: 50%;
  transform: translateX(-50%);
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

  img.MainIcon {
    width: 70px;
    heigth: 70x;
  }
`;

const NavBar = () => {
  return (
    <NavBarContainer>
      <NavItem to="/">
        <img src={HomeIcon} alt="Home" />
      </NavItem>
      <NavItem to="/medical-card">
        <img src={MedicalCardIcon} alt="Medical Card" />
      </NavItem>
      <NavItem to="/main" className="main-icon">
        <img src={MainIcon} alt="Main" />
      </NavItem>
      <NavItem to="/search-medical">
        <img src={SearchMedicalIcon} alt="Search Medical" />
      </NavItem>
      <NavItem to="/my">
        <img src={MyIcon} alt="My" />
      </NavItem>
    </NavBarContainer>
  );
};

export default NavBar;
