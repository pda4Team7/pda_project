import React, { useState, useEffect } from "react";
import { Image, Modal, Button } from "react-bootstrap";
import ttota from "~/assets/swimttota.png";
import ttota_hi from "~/assets/ttota_hi.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchSeatInfoList } from "~/apis/seatInfo";
import backIcon from "../../assets/back-icon.png";
import { useTicket } from "../../lib/apis/ticket";

const Finding = () => {
  // ** update된 user_destination과 리스트 명수 요청해서 받아오기 !
  const user_destination = useSelector((state) => state.user.endSt);
  const navigate = useNavigate();
  const [howmanyseats, setCount] = useState(0);
  const user = useSelector((state) => state.user.userName);

  useEffect(() => {
    fetchSeatInfoList().then((resp) => {
      // 몇 명이 타고 있는지 확인
      setCount(resp.length);
    });
  }, []);

  const [showModal, setShowModal] = useState(false);
  const handleModalClose = () => {
    setShowModal(false);
  };
  const handleTicketUse = () => {
    // ** ticket 소진 DB update 시키기 !
    useTicket().then((resp) => navigate("/standing/list"));
  };

  // 뒤로가기 핸들러
  const handleBackPage = () => {
    navigate(-1);
  };

  return (
    <>
      <Image onClick={handleBackPage} className="icon" src={backIcon} />

      <div className="finding-box">
        <div className="destination-text">
          {/* ** user_destination 강조 color 적용하기 ! */}
          <strong>{user_destination}</strong>역까지 가시는 군요!
        </div>
        <div className="finding-text">
          <strong>탑승한 열차 칸</strong>에
          <br />빈 자리가 생길지 확인해보세요.
        </div>
        <div className="finding-img">
          <Image
            className="ttotta-button"
            src={ttota}
            alt="image button finding seat lists"
            onClick={() => {
              setShowModal(true);
            }}
            fluid
          ></Image>
        </div>
        <Modal show={showModal} onHide={handleModalClose} centered>
          <Modal.Body>
            <Image
              className="ttotta-image"
              src={ttota_hi}
              alt="image button finding seat lists"
            ></Image>
            <div className="modal-title-text">
              {user_destination} 전에 내리는 사람이 {howmanyseats}명 있어요!
            </div>
            {howmanyseats === 0 ? (
              <p>
                아쉽게도 지금 내릴 예정인 사람이 없어요
                <br />
                다음에 다시 시도해주세요 😭
              </p>
            ) : (
              <p>
                {user}님의 열람권을 1회 사용해서
                <br />
                해당 좌석의 위치를 보시겠습니까?
              </p>
            )}
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="primary"
              onClick={handleTicketUse}
              disabled={howmanyseats === 0}
            >
              열람권 사용
            </Button>
            <Button variant="light" onClick={handleModalClose}>
              취소
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Finding;
