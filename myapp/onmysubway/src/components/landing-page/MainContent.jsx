import React, { useState } from 'react';
import { Image, Container, Button } from 'react-bootstrap';
import mainImg from '~/assets/ttota.svg';
import backImg from '~/assets/subway_side.png';
import title from '~/assets/subway_title.png';
import bottom from '~/assets/subway_back.png';

import { Link } from 'react-router-dom';

const MainContent = () => {
    // 이미지 로딩 상태를 제어하는 state
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageLoaded2, setImageLoaded2] = useState(false);

    // 이미지 로딩 완료 후 상태 변경 함수
    
    const handleImageLoad = () => {
        setImageLoaded(true);
    };
    const handleImageLoad2 = () => {
        setImageLoaded2(true);
    };

    return (
        <div className="main-home" style={{ overflow: 'hidden' }}>
        {/* 메인 이미지
        <Image
        className="main-img"
        src={mainImg}
        alt="onmysubway_main_image"
        fluid
        /> */}
        {/* 백그라운드 이미지 */}
        
        <Image className="subway-side" src={backImg} alt="onmysubway_main_image"
        onLoad={handleImageLoad}
        fluid />
        <Image className="animate__animated animate__pulse"
        id='subway-title' src={title} fluid />
        <Image className='subway-bottom' src={bottom}
        onLoad={handleImageLoad2}
        fluid />


            <Container className='main-box'>
                <div>
                {/* 이미지 로딩이 완료되면 메인 컨텐츠 표시 */}
                {(imageLoaded && imageLoaded2)? (
                    <div className="main-content">
                        {/* 타이틀 */}
                        {/* <h2 id="main-title">On My Subway</h2> */}
                        {/* 로그인 및 회원가입 버튼 */}
                        <div className="main-btn-group animate__animated animate__fadeIn">
                            <Button variant="primary" id="btn-main-login">
                                <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>
                                    Log In
                                </Link>
                            </Button>
                            <Button variant="primary" id="btn-main-register">
                                <Link to="/signup" style={{ textDecoration: 'none', color: '#4461F2' }}>
                                    Sign Up
                                </Link>
                            </Button>
                        </div>
                    </div>
                ) : (
                    // 이미지 로딩 중일 때 로딩 표시
                    <div>
                        {/* <p>Loading...</p> */}
                    </div>
                )}
                </div>
            </Container>
        </div>
    );
};

export default MainContent;
