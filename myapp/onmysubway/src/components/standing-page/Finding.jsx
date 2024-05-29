import React from 'react';
import { Image } from 'react-bootstrap';
import ttota from '~/assets/magnifying_ttota.svg'

const Finding = () => {
    // ** update된 user_destination 요청해서 받아오기 !
    const test_user_destination = '부천시청'
    const user_destination = test_user_destination

    return (
        <div className='finding-box'>
            <div className='destination-text'>
                {/* ** user_destination 강조 color 적용하기 ! */}
                <p>{user_destination}역까지 가시는 군요!</p>
            </div>
            <div className='finding-text'>
                <p>탑승한 열차 칸에<br />
                    빈 자리가 생길지 확인해보세요.
                </p>
            </div>
            <Image className='ttotta' src={ttota} fluid></Image>
        </div>
    );
};

export default Finding;