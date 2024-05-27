import { React, useState, useEffect } from 'react';
import { Form, Button, Image } from 'react-bootstrap';
import check_icon from '~/assets/password_check.svg';
import xcheck_icon from '~/assets/password_xcheck.svg';

const SignUp = () => {
    // signup을 시도하는 email과 password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // 입력된 password를 check
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(false);

    useEffect(() => {
        if (password && (password === passwordCheck)) {
          setPasswordMatch(true);
          console.log("비밀번호 일치")
        } else {
          setPasswordMatch(false);
        }
      }, [password, passwordCheck]);

    return (
    <div className='signup-box'>
      <div>
        <h2 id='text-signup'>Sign up</h2>
      </div>
      <div className='signup-content'>
        <Form >
            <Form.Group>
                <div className='signup-input-group'>
                    <Form.Control id='signup-email'
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
            </Form>
            <Button id='btn-signup-submit' variant="primary">
            Sign up
            </Button>
        </div>
    </div>

    );
};

export default SignUp;