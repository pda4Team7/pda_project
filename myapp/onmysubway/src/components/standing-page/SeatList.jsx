import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import userimg from "~/assets/user_profile.png";
import Image from "react-bootstrap/Image";

const SeatList = () => {
  const seatInfo = [
    { name: "최지연", startSt: "고속터미널", endSt: "상도" },
    { name: "오재현", startSt: "건대입구", endSt: "신중동" },
    { name: "이선민", startSt: "이수", endSt: "대림" },
    { name: "박찬란", startSt: "논현", endSt: "장승배기" },
    { name: "이동인", startSt: "강남구청", endSt: "숭실대입구" },
  ];
  return (
    <div className="main-container">
      <div className="seat-info-title">앉아갈 수 있는 정보</div>
      <ListGroup as="ol" className="seat-info-container">
        {seatInfo.map((elem, i) => (
          <ListGroup.Item as="li" key={"seat-item " + i}>
            <div className="seat-info-item">
              <Image src={userimg} roundedCircle />
              <div className="seat-info-text">
                <div>{elem.name}</div>
                <div>
                  {elem.startSt} &gt; {elem.endSt}
                </div>
              </div>
              <Button variant="primary">좌석보기</Button>{" "}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default SeatList;
