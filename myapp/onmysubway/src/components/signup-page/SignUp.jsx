import { React, useState, useEffect } from 'react';
import { Form, Button, Image, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import check_icon from '~/assets/password_check.svg';
import xcheck_icon from '~/assets/password_xcheck.svg';
import { serverSignUp, nicknameCheck } from "~/apis/auth.js";


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
    // 닉네임 중복체크 state
    const [nicknamestate, setNicknameState] = useState(false)
    

    // 닉네임 중복확인 여부 체크
    const handleNameCheck = () => {   
      try {
        nicknameCheck({nickname}).then((resp)=>{
          if (resp[0]===true){
            setNicknameState(true);
            alert('사용가능한 닉네임입니다.');            
          } else {
            setNicknameState(false);
            alert('중복된 닉네임입니다. 다른 닉네임을 사용해주세요.'); // 중복X시 check false       
          }        
        }) 
      } catch (err) {
          console.error(err);
      }
    }

    // 비밀번호 길이 체크
    let passwordLengthWarning = null;
    if (password && password.length < 8) {
          passwordLengthWarning = (
            <div className="password-warning">
              <p>비밀번호는 8자 이상이어야 합니다.</p>
            </div>
          );
        }       
    
    //비밀번호 재확인 체크
    useEffect(() => {
      // password가 8자리 이상이며, 비밀번호 재확인과 동일하면 체크표시
      if (password && (password === passwordCheck)  && password.length >= 8) {
        setPasswordMatch(true);
        console.log("비밀번호 일치")
      } else {
        setPasswordMatch(false);
      }
    }, [password, passwordCheck]);

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
      if (passwordMatch!==false) {
        try {        
          serverSignUp({nickname,password}).then((auth_data)=>{
            if (auth_data[0]!==false){
              console.log('회원가입 성공, User 정보: ', auth_data);
              setShowModal(true); // 회원가입 성공 시 모달 창 표시
            } else {
              console.log(auth_data[1])
              alert("닉네임 중복 여부를 확인해주세요.")
            }        
          }) 
        } catch (err) {
            console.error(err);
        }
      } else {
        alert("비밀번호가 올바르게 입력되었는지 확인해주세요.")
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
                  <div className='nickname-group'>
                    <Form.Control id='signup-email'
                        type="text"
                        placeholder="Nickname"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />                    
                    <Button variant="secondary" id="btn-nicknamecheck" onClick={handleNameCheck}>
                    중복확인</Button>                    
                    {nicknamestate?(
                      <Image src={check_icon}></Image>
                  ):(<Image src={xcheck_icon}></Image>)}
                  </div>
                  <div className='password-input-group'>
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
                            src={check_icon} 
                        />
                        ) :
                        <img
                        id='passwordcheck-icon'
                        src={xcheck_icon} 
                        />}                               
                    </div>
                
                    {/* 비밀번호 길이 경고 메시지 */}
                    {passwordLengthWarning}
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