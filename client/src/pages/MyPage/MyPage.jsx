import React, { useEffect, useState } from "react";
import styled from "styled-components";
import profileIcon from "../../assets/icons/profile.svg";

const MyPage = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    console.log("Logged out");
    window.location.href = "/login"; // 로그인 페이지로 이동
  };

  return (
    <Container>
      <Title>마이페이지</Title>
      <ProfileContainer>
        <ProfileIcon src={profileIcon} alt="Profile Icon" />
        <UserInfo>
          <UserName>{userName}님</UserName>
          {/* 회원가입 할 때 입력한 사용자 이름/아이디 뜨게 수정*/}
          <UserMessage>메디캐리어와 함께 안심 여행하세요 !</UserMessage>
        </UserInfo>
      </ProfileContainer>
      <LogoutContainer>
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      </LogoutContainer>
    </Container>
  );
};

export default MyPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: "Pretendard";
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #4a7dff;
  margin-bottom: 20px;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f0f8ff;
  padding: 20px;
  border-radius: 10px;
  width: 313px;
  height: 40px;
  border: 1px solid #f3f7fc;
  background: #f3f7fc;
  margin-bottom: 20px;
`;

const ProfileIcon = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 20px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #4a7dff;
`;

const UserMessage = styled.span`
  font-size: 16px;
  color: #1774ff;
  font-style: normal;
  font-weight: 400;
`;

const LogoutContainer = styled.div`
  width: 313px;
  height: 42px;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #f3f3f3;
  background: #fdfdfd;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: left; /* 버튼을 왼쪽 정렬 */
`;

const LogoutButton = styled.button`
  font-family: Pretendard;
  font-size: 14px;
  color: #fc4545;
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  border-radius: 10px;
  width: 100%;
  text-align: left;
  &:hover {
    background-color: #f8f8f8;
  }
`;
