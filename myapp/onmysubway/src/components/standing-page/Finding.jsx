import React, { useState, useEffect } from 'react';
import { Image, Modal, Button } from 'react-bootstrap';
import ttota from '~/assets/swimttota.png'
import ttota_hi from '~/assets/ttota_hi.png'
import { useNavigate } from 'react-router-dom';
import { serverUserInfo } from '~/lib/apis/auth';

const Finding = () => {
    // ** update된 user_destination과 리스트 명수 요청해서 받아오기 !
    const test_user_destination = '부천시청'
    const test_howmanyseats = 5
    const user_destination = test_user_destination
    const howmanyseats = test_howmanyseats
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        try {
            serverUserInfo().then((resp)=>{
                console.log(resp.data)
                setUser(resp.data)
                
            })
        } catch (error) {
            console.log(error)
        }    
    }, [])

    const [showModal,setShowModal] = useState(false);
    const handleModalClose = () => {
        setShowModal(false);
      };
      const handleTicketUse = () => {
        // ** ticket 소진 DB update 시키기 !
        navigate('/standing/list')
      };

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
            <Image className='ttotta-button' src={ttota} alt="image button finding seat lists"
            onClick={()=>{setShowModal(true)}} fluid>
            </Image>
            <Modal show={showModal} onHide={handleModalClose} centered>
                <Modal.Body>
                    <Image className='ttotta-image' src={ttota_hi} alt="image button finding seat lists"></Image>
                    <h5>{user_destination} 전에 내리는 사람이 {howmanyseats}명 있어요!</h5>
                    <p> 열람권을 1회 사용해서<br/>
                        해당 좌석의 위치를 보시겠습니까?</p>
                </Modal.Body>
                
                <Modal.Footer>
                <Button variant='primary' onClick={handleTicketUse}>
                    열람권 사용
                </Button>
                <Button variant='light' onClick={handleModalClose}>
                    취소
                </Button>
                </Modal.Footer>
            </Modal> 
        </div>
    );
};

export default Finding;