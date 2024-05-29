import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Image, Form, Button } from 'react-bootstrap';
import userimg from "~/assets/user_profile.png";
import userticket from "~/assets/user_tickets.svg";
import { serverUserInfo } from '~/lib/apis/auth';

const MyInfo = () => {    
    // 첫 렌더링시 user의 정보를 get요청 보내서 가져옴    
    const [user,setUser] = useState(null);
    const [password,setPassword] = useState('');
    useEffect(() => {
        try {
            serverUserInfo().then((data)=>{
            setUser(data);
            setPassword(data.password)
            })
        } catch (error) {
            console.log(error)
        }    
    }, [])
    console.log(password)
    // !!** password 해싱 전 값 가져오는 법 확인하고 수정하기

    const [pw_before,setPasswordBefore]= useState('');
    const [pw_after,setPasswordAfter]= useState('');
    const [pwchange, setPasswordChange] = useState(false);
    const [pwcorrect, setPasswordCorrect] = useState(false);

    // 현재 비밀번호와 다른 비밀번호로 수정해야 함
    // ** 비밀번호 조건 추가되면 코드 수정 !
    useEffect(() => {
        if (pw_after && (pw_before === pw_after)) {
          setPasswordChange(true);
          console.log("비밀번호 변경가능")
        } else {
          setPasswordChange(false);
        }
      }, [pw_after]);
    
    // 현재 비밀번호가 정확한지 확인
    useEffect(() => {
    if (pw_before && (password === pw_before)) {
        setPasswordCorrect(true);
        console.log("현재 비밀번호와 일치")
    } else {
        setPasswordCorrect(false);
    }
    }, [pw_before]);
    
    // 응답 전에 user 정보를 렌더링하려고 하면 null인 상태에서 렌더링이 먼저 됨
    // => user가 null인 경우는 Loading화면 표시
    if (!user) {
        return <div>Loading...</div>;
      }
    return (
        <div className='info-box'>
            <section className='profile-section'>
                <Image src={userimg}></Image>
                <p>
                    {user.nickname}
                </p>
            </section>
            
            <div className='vertical-line'></div>
            <section className='user-info-section'>
                <section className='user-ticket-section'>
                    <Image src={userticket}></Image>
                    <p> 열람권 </p>
                    <p> 보유한 열람권: {user.ticket}개</p>
                </section>

                <section className='user-pw-section'>
                    <Image src={userticket}></Image>
                    <p> 내 정보 수정 </p>
                    <Form>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Control className='password-before'       
                            type="password"
                            placeholder="현재 비밀번호"
                            value={pw_before}
                            onChange={(e) => setPasswordBefore(e.target.value)}
                        />
                        <Form.Control className='password-after'       
                            type="password"
                            placeholder="변경할 비밀번호"
                            value={pw_after}
                            onChange={(e) => setPasswordAfter(e.target.value)}
                        />
                    </Form.Group>
                    </Form>
                </section>

                <section className='user-logout-section'> 
                    <Image src={userticket}></Image>
                    <Button> 로그아웃 </Button>
                </section>
            </section>
        </div>
    );
};

export default MyInfo;