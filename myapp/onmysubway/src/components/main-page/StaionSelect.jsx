import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import UserInfo from "./UserInfo";
import { postUserInfo } from "~/apis/userInfo";
import { useDispatch } from "react-redux";
import { setEndSt } from "~/store/reducers/user";
import { motion } from "framer-motion";
import styled from "styled-components";

// 컴포넌트 이름: StaionSelect
// 컴포넌트 역할: main page에서 출발역 / 도착역 선택, 선택 다 한 후 고객 모달창 띄워주기
// 추후에 고객의 서있는/앉아있는 상태에 따라 handleSubmit에서 가는 navigate를 다르게 하면 될듯
// css 파일: routes > page.css
const Box = styled(motion.div)`
  position: fixed;
  right: 20vw;
  bottom: 30px;
  z-index: 10;
  width: 60vw;
  height: 8vh;
  font-size: 20px;
  background-color: #0d6efd;
  color: white;
  text-align: center;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
const hoverVars = {
  hover: {
    scale: 1.5,
    rotateZ: 90,
  },
  click: {
    scale: 1.3,
    borderRadius: "100px",
  },
  drag: {
    backgroundColor: "rgb(46, 204, 113)",
    transition: { duration: 3 },
  },
};

export default function StaionSelect({
  color,
  depart,
  setDepart,
  arr,
  setArr,
  trainNumber,
  setTrainNumber,
  userState,
  setUserState,
}) {
  const user = useSelector((state) => state.user.userId);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 모달창 띄울지 말지 결정하는 State
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false); // 모달 창 닫음
  const handleOpen = () => setShow(true); // 모달 창 열기
  const handleSubmit = () => {
    if (trainNumber === ""){
      alert("칸 번호를 작성해주세요!")
    } else{
// 이때 만일 고객이 서있으면, state를 true로, 아니면 false로 설정
    // userState === "stand-state" ? setUserState(true) : setUserState(false);
    // 1. 만일 앉아 있는 사람이라면 -> 다음 페이지로 넘김
    if (userState === "sit-state") {
      navigate("/seatInfo", {
        state: {
          user: user,
          startSt: depart,
          endSt: arr,
          compartment: trainNumber,
        },
      });
    }
    // 2. 만일 서있는 사람이라면, -> 다음 페이지로 넘김
    else {
      const isSeated = false;
      const clothes = "";
      const seatNum = "stand";

      // 도착 정보를 redux로 추가
      dispatch(setEndSt({ endSt: arr }));

      postUserInfo({
        user,
        depart,
        arr,
        trainNumber,
        isSeated,
        clothes,
        seatNum,
      }).then((resp) => {
        console.log(resp); // 고객의 정보 넘기기
        navigate("/standing");
      });
    }
    }
    
  };

  // 이후에 이건 서버에서 받아올 것
  const stations = [
    {
      name: "장암",
      number: 701,
    },
    {
      name: "도봉산",
      number: 702,
    },
    {
      name: "수락산",
      number: 703,
    },
    {
      name: "마들",
      number: 704,
    },
    {
      name: "노원",
      number: 705,
    },
    {
      name: "중계",
      number: 706,
    },
    {
      name: "하계",
      number: 707,
    },
    {
      name: "공릉(서울과학기술대)",
      number: 708,
    },
    {
      name: "태릉입구",
      number: 709,
    },
    {
      name: "먹골",
      number: 710,
    },
    {
      name: "중화",
      number: 711,
    },
    {
      name: "상봉",
      number: 712,
    },
    {
      name: "면목",
      number: 713,
    },
    {
      name: "사가정",
      number: 714,
    },
    {
      name: "용마산(용마폭포공원)",
      number: 715,
    },
    {
      name: "중곡",
      number: 716,
    },
    {
      name: "군자(능동)",
      number: 717,
    },
    {
      name: "어린이대공원(세종대)",
      number: 718,
    },
    {
      name: "건대입구",
      number: 719,
    },
    {
      name: "자양(뚝섬한강공원)",
      number: 720,
    },
    {
      name: "청담",
      number: 721,
    },
    {
      name: "강남구청",
      number: 722,
    },
    {
      name: "학동",
      number: 723,
    },
    {
      name: "논현",
      number: 724,
    },
    {
      name: "반포",
      number: 725,
    },
    {
      name: "고속터미널",
      number: 726,
    },
    {
      name: "내방",
      number: 727,
    },
    {
      name: "이수",
      number: 728,
    },
    {
      name: "남성",
      number: 729,
    },
    {
      name: "숭실대입구(살피재)",
      number: 730,
    },
    {
      name: "상도",
      number: 731,
    },
    {
      name: "장승배기",
      number: 732,
    },
    {
      name: "신대방삼거리",
      number: 733,
    },
    {
      name: "보라매",
      number: 734,
    },
    {
      name: "신풍",
      number: 735,
    },
    {
      name: "대림(구로구청)",
      number: 736,
    },
    {
      name: "남구로",
      number: 737,
    },
    {
      name: "가산디지털단지",
      number: 738,
    },
    {
      name: "철산",
      number: 739,
    },
    {
      name: "광명사거리",
      number: 740,
    },
    {
      name: "천왕",
      number: 741,
    },
    {
      name: "온수(성공회대입구)",
      number: 742,
    },
    {
      name: "까치울",
      number: 743,
    },
    {
      name: "부천종합운동장",
      number: 744,
    },
    {
      name: "춘의",
      number: 745,
    },
    {
      name: "신중동",
      number: 746,
    },
    {
      name: "부천시청",
      number: 747,
    },
    {
      name: "상동",
      number: 748,
    },
    {
      name: "삼산체육관",
      number: 749,
    },
    {
      name: "굴포천",
      number: 750,
    },
    {
      name: "부평구청",
      number: 751,
    },
    {
      name: "산곡",
      number: 752,
    },
  ];

  return (
    <div>
      {stations.map((elem, i) => (
        <div
          className="total-station-container animate__animated animate__fadeInUp"
          key={"total-station-container " + i}
        >
          {/* 모달 */}
          {depart === elem.name && (
            <div className="select-depart-arr left animate__animated animate__fadeInUp">
              <i className="fa-solid fa-check animate__animated animate__fadeInUp"></i>
              출발
            </div>
          )}
          <div className="station-item">
            <div className="station-select">
              <div
                className="station-select-line"
                style={{ border: "4px solid " + color, backgroundColor: color }}
              ></div>
              <div
                className="station-select-circle"
                style={{ border: "4px solid " + color }}
                onClick={() => {
                  setDepart(elem.name);
                }}
              ></div>
            </div>
            <div className="station-info">
              <div
                key={"station-number" + i}
                className="station-number"
                style={{ border: "4px solid " + color }}
              >
                {elem.number}
              </div>
              <div key={"station-name" + i} className="station-name">
                {elem.name}
              </div>
            </div>
            <div className="station-select">
              <div
                className="station-select-line"
                style={{ border: "4px solid " + color, backgroundColor: color }}
              ></div>
              <div
                className="station-select-circle"
                style={{ border: "4px solid " + color }}
                onClick={() => {
                  setArr(elem.name);
                }}
              ></div>
            </div>
          </div>
          {/* 모달 */}
          {arr === elem.name && (
            <div className="select-depart-arr right  animate__animated animate__fadeInUp">
              <i className="fa-solid fa-check  animate__animated animate__fadeInUp"></i>
              도착
            </div>
          )}
        </div>
      ))}
      {arr !== null && depart !== null ? (
        <Box
          variants={hoverVars}
          whileHover="hover"
          whileTap="click"
          onClick={handleOpen}
        >
          추가 정보 입력하러 가기
        </Box>
      ) : null}
      <UserInfo
        show={show}
        trainNumber={trainNumber}
        setTrainNumber={setTrainNumber}
        userState={userState}
        setUserState={setUserState}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
