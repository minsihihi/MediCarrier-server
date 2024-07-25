import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/login', {
            username,
            password,
        });

        // 로그인 성공 시 응답 데이터 확인
        console.log('로그인 응답 데이터:', response.data);

        // 응답에서 access, refresh 토큰과 userId를 가져와 localStorage에 저장
        if (response.data && response.data.data) {
            const { access, refresh, userId } = response.data.data; // 응답 데이터에서 필요 정보 추출

            if (access) {
                localStorage.setItem('token', access); // access 토큰 저장
                console.log('저장된 access 토큰:', localStorage.getItem('token')); // 디버깅용
            } else {
                console.error('응답 데이터에서 access 토큰을 찾을 수 없습니다.');
            }

            if (refresh) {
                localStorage.setItem('refreshToken', refresh); // refresh 토큰 저장
                console.log('저장된 refresh 토큰:', localStorage.getItem('refreshToken')); // 디버깅용
            } else {
                console.error('응답 데이터에서 refresh 토큰을 찾을 수 없습니다.');
            }

            if (userId) {
                localStorage.setItem('userId', userId); // 사용자 ID를 로컬 스토리지에 저장
                console.log('저장된 사용자 ID:', localStorage.getItem('userId')); // 디버깅용
            } else {
                console.error('응답 데이터에서 사용자 ID를 찾을 수 없습니다.');
            }

            alert('로그인 성공');
            navigate('/');
        } else {
            console.error('응답 데이터가 올바르지 않습니다.');
        }
    } catch (err) {
        console.error('로그인 실패:', err);
        setError('로그인 실패');
    }
};

  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <label>
          사용자 이름:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          비밀번호:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">로그인</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
