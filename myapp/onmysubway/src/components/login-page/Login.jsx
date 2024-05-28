import React, { useState, useEffect } from 'react';
import { Form, Button, Image } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { serverLogin } from "~/apis/auth.js";

const Login = () => {
  // login을 시도하는 userEmail과 usePassword
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  // login에 성공한 user의 Email과 Password 정보
  const [user, setUser] = useState(null);
  
  // 로그인 버튼을 누르면 호출되는 함수
  const handleLogin = (event) => {
    // Form이 새로고침되기 때문에 새로고침을 막고 로그인 정보를 보냄
    event.preventDefault();    
    console.log('Nickname:', nickname);
    console.log('Password:', password);

    // serverLogin 함수를 통해 DB에 저장되어 있는 User 정보와 일치하는지 request 요청을 보내고,
    // 응답받은 데이터로 로그인된 user의 정보를 가져온다.
    try {
      serverLogin({nickname,password}).then((auth_data)=>{
      console.log('Login 성공, User 정보: ');
      // 로그인 성공 후 User 정보 설정
      setUser(auth_data);})
      console.log(user)
      // **로그인 실패 후 => 이어서 코드 작성!
    } catch (error) {
        console.error('Login 실패, Error 출력: ', error);
    }
  };


  // signup 버튼을 누르면 호출되는 함수
  // navigate를 통해 signup 페이지로 이동
  const navigate = useNavigate();
  const gotosignup = () => {
    navigate('/signup');
  };


  return (
    <div className='login-box'>
      <div>
      <h2 id='text-login'>Log in</h2>
      <Form className='login-content' onSubmit={handleLogin}>
        <div className='login-form'>
        <Form.Group controlId="formBasicUserEmail" >
          <Form.Control className='login-input'
            type="text"
            placeholder="Enter Email"
            style={{fontStyle : "italic"}}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Control className='login-input'       
            type="password"
            placeholder="●●●●●●●●"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        </div>
        <div className='btn-login-group'>
        <Button id='btn-login-login' variant="primary" type="submit"
        >
          Log in
          {user ? (<Link to='/main'></Link>) : (null)}
        </Button>
        <Button id='btn-login-register' variant="light" onClick={gotosignup}>
          Sign up
        </Button>
        </div>
      </Form>
      </div>
    </div>
  );
};


export default Login;