import React, { useState } from 'react';
import { Image, Container, Button } from 'react-bootstrap';
import mainImg from '~/assets/ttota.svg';
import backImg from '~/assets/back_img.svg';
import { Link } from 'react-router-dom';

const MainContent = () => {
    // 이미지 로딩 상태를 제어하는 state
    const [imageLoaded, setImageLoaded] = useState(false);
    // 이미지 로딩 완료 후 상태 변경 함수
    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    return (
        <div className="main-home" style={{ overflow: 'hidden' }}>
        {/* 메인 이미지 */}
        <Image
        className="main-img"
        src={mainImg}
        alt="onmysubway_main_image"
        onLoad={handleImageLoad}
        fluid
        />
        {/* 백그라운드 이미지 */}
        <Image className="back-img" src={backImg} alt="onmysubway_main_image" fluid />

            <Container className='main-box'>
                <div>
                {/* 이미지 로딩이 완료되면 메인 컨텐츠 표시 */}
                {imageLoaded ? (
                    <div className="main-content">
                        {/* 타이틀 */}
                        <h2 id="main-title">Main Title</h2>
                        {/* 로그인 및 회원가입 버튼 */}
                        <div className="main-btn-group">
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
                        <p>Loading...</p>
                    </div>
                )}
                </div>
            </Container>
        </div>
    );
};

export default MainContent;
