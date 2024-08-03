import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("https://minsi.pythonanywhere.com/api/signup/", {
        username,
        password,
        nickname,
      });
      alert("회원가입 성공");
      // 회원가입 후 !!회원가입 성공!! 페이지로 리다이렉션
      navigate("/signup.succes");
    } catch (err) {
      setError("회원가입 실패");
      console.error(err);
    }
  };

  return (
    <SignupContainer>
      <h2>회원가입</h2>
      <p>회원가입을 위해 아래 내용을 입력해주세요</p>
      <form onSubmit={handleSubmit}>
        <label>아이디 </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>비밀번호 </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>닉네임 </label>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />
        <button type="submit">가입하기</button>
        {error && <p>{error}</p>}
      </form>
    </SignupContainer>
  );
};

export default Register;

const SignupContainer = styled.div`
  margin: 90px 20px 47px 20px;
  h2 {
    color: var(--black, #000);
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.5px;
    margin-bottom: 26px;
  }
  p {
    color: var(--black, #000);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.5px;
    margin-bottom: 66px;
  }
  form {
    display: flex;
    flex-direction: column;
    label {
      color: #757575;
      font-family: Pretendard;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: -0.5px;
      margin-bottom: 8px;
    }
    input {
      border-radius: 8px;
      border: 1px solid #d9d9d9;
      width: 313px;
      height: 30px;
      padding: 15px 20px;
      margin-bottom: 16px;

      color: #757575;
      font-family: Pretendard;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: -0.5px;
    }
    button {
      display: flex;
      width: 353px;
      height: 50px;
      padding: 13px 91px;
      justify-content: center;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
      border-radius: 8px;
      background: var(--Color, #4a7dff);
      border: 0;
      margin-top: 150px;

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
