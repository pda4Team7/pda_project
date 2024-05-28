import { React, useState, useEffect } from 'react';
import { Form, Button, Image } from 'react-bootstrap';
import check_icon from '~/assets/password_check.svg';
import xcheck_icon from '~/assets/password_xcheck.svg';
import { serverSignUp } from "~/apis/auth.js";


const SignUp = () => {
    // signup을 시도하는 email과 password
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    // 입력된 password를 check하는 state관리
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(false);
    // ** password 8자 이상 조건 코드작성!
    useEffect(() => {
        if (password && (password === passwordCheck)) {
          setPasswordMatch(true);
          console.log("비밀번호 일치")
        } else {
          setPasswordMatch(false);
        }
      }, [password, passwordCheck]);
    
    // ** Nickname 중복확인 요청 및 useEffect 코드작성!

    // serverSingUp 함수를 통해 DB에 회원가입 request 요청을 보내고, 이후 페이지 이동시키기
    const handleSignUp = (event) => {
      event.preventDefault(); 
      console.log(nickname,password);
      try {
        serverSignUp({nickname,password}).then((auth_data)=>{
        console.log('회원가입 성공, User 정보: ', auth_data);
        // ** 회원가입 성공 후 => 모달 창 및 로그인 페이지로 이동시키기 코드 작성!
        
        }) 
        // ** 회원가입 실패 후 => 이어서 코드 작성!
      } catch (error) {
          console.error('회원가입 실패, Error 출력: ', error);
      }
    }

    return (
    <div className='signup-box'>
      <div>
        <h2 id='text-signup'>Sign up</h2>
      </div>
        <Form onSubmit={handleSignUp}>
          <div className='signup-content'>          
            <Form.Group>
                <div className='signup-input-group'>
                    <Form.Control id='signup-email'
                        type="text"
                        placeholder="Email"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                    <Form.Control id='signup-password'
                        type="Password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className='passwordcheck-group'>
                        <Form.Control id='signup-passwordcheck'
                            type="Password"
                            placeholder="Confirm your password"
                            value={passwordCheck}
                            onChange={(e) => setPasswordCheck(e.target.value)}
                        />
                        {passwordMatch ? (
                        <img
                            id='passwordcheck-icon'
                            src={check_icon} // SVG 파일 경로에 따라 수정하세요.
                        />
                        ) :
                        <img
                        id='passwordcheck-icon'
                        src={xcheck_icon} // SVG 파일 경로에 따라 수정하세요.
                        />}
                    </div>
                
                
                </div>
            </Form.Group>
            <Button id='btn-signup-submit' variant="primary" type="submit">
            Sign up
            </Button>
          </div>
        </Form>            
    </div>

    );
};

export default SignUp;