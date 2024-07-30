import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const navigateToSignup = () => {
    navigate("/signup");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        username,
        password,
      });
  
      // 로그인 성공 시 응답 데이터 확인
      console.log("로그인 응답 데이터:", response.data);
  
      // 응답에서 access_token과 userId, nickname을 가져와 localStorage에 저장
      if (response.data && response.data.data) {
        const { access_token, id, nickname } = response.data.data; // 응답 데이터에서 필요 정보 추출
  
        if (access_token) {
          localStorage.setItem("token", access_token); // access 토큰 저장
          console.log("저장된 access 토큰:", localStorage.getItem("token")); // 디버깅용
        } else {
          console.error("응답 데이터에서 access 토큰을 찾을 수 없습니다.");
        }
  
        if (id) {
          localStorage.setItem("userId", id); // 사용자 ID를 로컬 스토리지에 저장
          console.log("저장된 사용자 ID:", localStorage.getItem("userId")); // 디버깅용
        } else {
          console.error("응답 데이터에서 사용자 ID를 찾을 수 없습니다.");
        }
  
        if (nickname) {
          localStorage.setItem("userName", nickname); // 사용자 이름을 로컬 스토리지에 저장
          console.log("저장된 사용자 이름:", localStorage.getItem("userName")); // 디버깅용
        } else {
          console.error("응답 데이터에서 사용자 이름을 찾을 수 없습니다.");
        }
  
        alert("로그인 성공");
        navigate("/home");
      } else {
        console.error("응답 데이터가 올바르지 않습니다.");
      }
    } catch (err) {
      console.error("로그인 실패:", err);
      setError("로그인 실패");
    }
  };

  return (
    <LoginPage>
      <Title>
        메디캐리어와 함께 <br />
        안심 여행 할 준비되셨나요?
      </Title>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="아이디 입력"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          placeholder="비밀번호 입력"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">로그인</button>
        {error && <p>{error}</p>}
      </form>
      <ToSignin onClick={navigateToSignup} style={{ cursor: "pointer" }}>
        회원가입
      </ToSignin>
      <img src="../../img/login_line.svg" />
      <img src="../../img/kakaotalk.svg" style={{ cursor: "pointer" }} />
    </LoginPage>
  );
};

export default Login;

const LoginPage = styled.div`
  /* background-color: #ffff; */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 133px 20px;
  img {
    margin-bottom: 20px;
  }
  form {
    input {
      margin-bottom: 8px;
      height: 30px;
      width: 313px;
      padding: 15px 20px;
      align-items: center;
      gap: 227px;
      align-self: stretch;
      border-radius: 8px;
      border: 1px solid #d9d9d9;

      color: #757575;
      font-family: Pretendard;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: -0.5px;
    }
    input::placeholder {
      color: #a7a7a7;
      font-family: Pretendard;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: -0.5px;
    }
    button {
      height: 60px;
      width: 353px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 227px;
      align-self: stretch;
      border-radius: 8px;
      background: var(--Color, #4a7dff);
      border: 0;
      margin-bottom: 24px;

      color: #fff;
      font-family: Pretendard;
      font-size: 20px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      letter-spacing: -0.5px;
      cursor: pointer;
    }
  }
`;
const Title = styled.div`
  color: var(--black, #000);
  font-family: Pretendard;
  font-size: 30px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.439px;
  padding: 0 37px 44px 0;
`;

const ToSignin = styled.div`
  color: #555;
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.439px;
  text-decoration-line: underline;
  margin-bottom: 42px;
`;
