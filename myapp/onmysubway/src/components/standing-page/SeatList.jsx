import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import userimg from "~/assets/user_profile.png";
import Image from "react-bootstrap/Image";
import { fetchSeatInfoList } from "~/apis/seatInfo";
import SeatDetailInfo from "~/components/standing-page/SeatDetailInfo";
import { useNavigate } from "react-router-dom";
import backIcon from "../../assets/back-icon.png";
import { serverOneUserGetImage } from "~/lib/apis/auth";

const SeatList = () => {
  const [seatList, setSeatList] = useState([]);
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const chooseUser = (user) => {
    setUser(user);
    setShow(true);
  };
  const handleBackPage = () => {
    navigate(-1);
  };

  const fetchUserImage = async (userId) => {
    try {
      const resp = await serverOneUserGetImage(userId);
      if (resp && resp instanceof Blob) {
        return resp;
      } else {
        console.error("Invalid image data:", resp);
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const seatInfoList = await fetchSeatInfoList();
        const newSeatList = await Promise.all(
          seatInfoList.map(async (elem) => {
            const userImage = await fetchUserImage(elem.user._id);
            return {
              user: elem.user,
              startSt: elem.startSt,
              endSt: elem.endSt,
              seatNum: elem.seatNum,
              clothes: elem.clothes,
              userImage: userImage,
            };
          })
        );
        setSeatList(newSeatList);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  function gotoFirst() {
    navigate("/main");
  }
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
      <Image onClick={handleBackPage} className="icon" src={backIcon} />
      <div className="main-container">
        <div className="seat-info-title">좌석 정보 리스트</div>
        <ListGroup as="ol" className="seat-info-container">
          {seatList.map((elem, i) => (
            <ListGroup.Item as="li" key={"seat-item " + i}>
              <div className="seat-info-item">
                <Image
                  className="image"
                  src={
                    elem.userImage
                      ? URL.createObjectURL(elem.userImage)
                      : userimg
                  }
                  roundedCircle
                />
                <div className="seat-info-text">
                  <div className="seat-info-name">{elem.user.nickname}</div>
                  <div>
                    {elem.startSt} &gt; {elem.endSt}
                  </div>
                </div>
                <Button
                  className="seat-info-btn"
                  variant="primary"
                  onClick={() => chooseUser(elem)}
                >
                  좌석보기
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <Button variant="primary" onClick={gotoFirst} className="back-btn">
          처음으로 돌아가기
        </Button>{" "}
      </div>
      {show === true ? (
        <SeatDetailInfo show={show} handleClose={handleClose} user={user} />
      ) : null}
    </>
  );
};

export default SeatList;
