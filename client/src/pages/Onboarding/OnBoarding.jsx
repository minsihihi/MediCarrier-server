import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const OnBoarding = () => {
  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <img
        onClick={navigateToLogin}
        src="../../img/OnBoarding.svg"
        style={{
          padding: "275px 128px 334px 127px",
        }}
      />
    </>
  );
};

export default OnBoarding;
