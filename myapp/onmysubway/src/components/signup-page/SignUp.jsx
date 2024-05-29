import { React, useState, useEffect } from 'react';
import { Form, Button, Image, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import check_icon from '~/assets/password_check.svg';
import xcheck_icon from '~/assets/password_xcheck.svg';
import { serverSignUp } from "~/apis/auth.js";


const SignUp = () => {
    // signup을 시도하는 email과 password
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    // 입력된 password를 check하는 state
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(false);
    // 회원가입 성공 모달창 state 및 로그인 페이지로 리다이렉션하기위한 navigate함수
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

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

    // <회원가입 성공시>    
    // 모달 종료 후 로그인 페이지로 리다이렉션하는 함수
    const handleModalClose = () => {
      setShowModal(false);
      navigate('/login'); // 모달 창 닫힌 후 로그인 페이지로 이동
    };

    // serverSingUp 함수를 통해 DB에 회원가입 request 요청을 보내고, 이후 페이지 이동시키기
    const handleSignUp = (event) => {
      event.preventDefault(); 
      console.log(nickname,password);
      try {
        serverSignUp({nickname,password}).then((auth_data)=>{
          if (auth_data!==false){
            console.log('회원가입 성공, User 정보: ', auth_data);
            setShowModal(true); // 회원가입 성공 시 모달 창 표시
          } else {
            alert("회원가입 도중 에러가 발생하였습니다. 닉네임과 비밀번호를 확인해주세요.")
          }        
        }) 
      } catch (err) {
          console.error(err);
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
        {/* 회원가입 성공 모달 */}
      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>회원가입 성공!🔐</Modal.Title>
        </Modal.Header>
        <Modal.Body>로그인 페이지로 이동합니다.</Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={handleModalClose}>
            확인
          </Button>
        </Modal.Footer>
        </Modal>            
    </div>

    );
};

export default SignUp;