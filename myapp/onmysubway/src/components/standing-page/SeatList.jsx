import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import userimg from "~/assets/user_profile.png";
import Image from "react-bootstrap/Image";
import { fetchSeatInfoList } from "~/apis/seatInfo";
import SeatDetailInfo from "~/components/standing-page/SeatDetailInfo";

const SeatList = () => {
  const [seatList, setSeatList] = useState([]);
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(null);
  const handleClose = () => setShow(false);
  const chooseUser = (user) => {
    setUser(user);
    setShow(true);
  };

  useEffect(() => {
    fetchSeatInfoList().then((resp) => {
      const newSeatList = resp.map((elem) => {
        return {
          user: elem.user,
          startSt: elem.startSt,
          endSt: elem.endSt,
          seatNum: elem.seatNum,
          clothes: elem.clothes
        };
      });
      setSeatList(newSeatList);
    });
  }, []);

  // debug용. 데이터가 없을 때
  const seatInfo = [
    { name: "최지연", startSt: "고속터미널", endSt: "상도" },
    { name: "오재현", startSt: "건대입구", endSt: "신중동" },
    { name: "이선민", startSt: "이수", endSt: "대림" },
    { name: "박찬란", startSt: "논현", endSt: "장승배기" },
    { name: "이동인", startSt: "강남구청", endSt: "숭실대입구" },
  ];

  return (
    <>
      <div className="main-container">
        <div className="seat-info-title">앉아갈 수 있는 정보</div>
        <ListGroup as="ol" className="seat-info-container">
          {seatList.map((elem, i) => (
            <ListGroup.Item as="li" key={"seat-item " + i}>
              <div className="seat-info-item">
                <Image src={userimg} roundedCircle />
                <div className="seat-info-text">
                  <div>{elem.user.nickname}</div>
                  <div>
                    {elem.startSt} &gt; {elem.endSt}
                  </div>
                </div>
                <Button variant="primary" onClick={() => chooseUser(elem)}>
                  좌석보기
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      {show === true ? (
        <SeatDetailInfo show={show} handleClose={handleClose} user={user} />
      ) : null}
    </>
  );
};

export default SeatList;
